import { Currency } from "../enums/Currency";

export class CreatePaymentDto {
  public userId: string;

  public email: string;

  public amount: number;

  public currency: Currency;
}