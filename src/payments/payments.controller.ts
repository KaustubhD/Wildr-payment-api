import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('')
  public create(@Body() userDto: CreatePaymentDto) {
    return this.paymentsService.createPaymentFor(userDto);
  }

  @Get('success')
  public paymentSuccessPage(@Query('id') sessionId: string) {
    return this.paymentsService.markPaymentSuccess(sessionId);
  }

  @Get('failure')
  public paymentFailurePage(@Query('id') sessionId: string) {
    return this.paymentsService.markPaymentFailure(sessionId);
  }

}
