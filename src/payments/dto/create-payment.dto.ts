import { Currency } from "../enums/Currency";

export class CreatePaymentDto {
  public amount: number;

  public currency: Currency;
}