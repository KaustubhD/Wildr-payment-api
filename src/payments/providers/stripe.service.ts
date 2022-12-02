import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    const privateKey = process.env.STRIPE_API_KEY;
    if (!privateKey) {
      throw new Error("Stripe private key not present");
    }
    this.stripe = new Stripe(privateKey, { apiVersion: '2022-11-15' });
  }

  public getInstance(): Stripe {
    return this.stripe;
  }
}