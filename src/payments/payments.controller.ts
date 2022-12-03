import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { User } from '../common/decorator/authenticatedUser.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';
import { AuthenticatedUserDto } from '../common/dto/authenticatedUser.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public create(@Body() userDto: CreatePaymentDto, @User() user: AuthenticatedUserDto) {
    return this.paymentsService.createPaymentFor(userDto, user);
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
