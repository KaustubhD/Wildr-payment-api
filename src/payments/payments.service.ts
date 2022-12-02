import { Injectable, InternalServerErrorException, Logger, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { StripeService } from './providers/stripe.service';
import Stripe from 'stripe';
import * as util from 'util';
import { PaymentStatus } from './enums/PaymentStatus';

@Injectable()
export class PaymentsService {

  public constructor(
    private stripeService: StripeService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
  ) {}


  async createPaymentFor(dto: CreatePaymentDto) {
    let stripeSession: Stripe.Response<Stripe.Checkout.Session>;
    try {
      const userRecord = await this.usersRepository.findOneBy({ userId: dto.userId });
      stripeSession = await this.createStripeSession(dto);
      const newPayment = this.paymentsRepository.create({
        stripeSessionId: stripeSession.id,
        amount: dto.amount,
        currency: dto.currency,
        user: userRecord,
      });
  
      await this.paymentsRepository.save(newPayment);
  
      return { url: stripeSession.url };
    } catch (error) {
      Logger.error(error);
      await this.expireStripeSession(stripeSession);

      throw new InternalServerErrorException(error);
    }
  }

  async markPaymentSuccess(sessionId: string) {
    const paymentRecord = await this.paymentsRepository.findOneBy({ stripeSessionId: sessionId });

    paymentRecord.finalisedAt = this.getCurrentTimestamp();
    paymentRecord.paymentStatus = PaymentStatus.Paid;

    this.paymentsRepository.save(paymentRecord);
    Logger.debug("Payment successful");

    return { message: 'Payment successful' };
  }
  
  async markPaymentFailure(sessionId: string) {
    const paymentRecord = await this.paymentsRepository.findOneBy({ stripeSessionId: sessionId });
    
    paymentRecord.finalisedAt = this.getCurrentTimestamp();
    paymentRecord.paymentStatus = PaymentStatus.Cancelled;

    this.paymentsRepository.save(paymentRecord);
    Logger.debug("Payment failed");

    return { message: 'Payment failed' };
  }

  private async createStripeSession(dto: CreatePaymentDto): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return this.stripeService.getInstance().checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_FAILURE_URL,
      payment_method_types: ['card'],
      mode: 'payment',
      currency: dto.currency.toString(),
      customer_email: dto.email,
      line_items: [
        {
          price_data: {
            unit_amount: dto.amount,
            product_data: {
              name: 'One time checkout',
            },
            currency: dto.currency,
          },
          quantity: 1,
        }
      ]
    });
  }

  private async expireStripeSession(session: Stripe.Response<Stripe.Checkout.Session>): Promise<void> {
    if (session) {
      await this.stripeService.getInstance().checkout.sessions.expire(session.id);

      Logger.debug("Stripe session cancelled");
    }
  }

  private getCurrentTimestamp(): string {
    return new Date().toUTCString();
  }
}
