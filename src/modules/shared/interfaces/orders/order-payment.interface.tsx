import { ECreditCardType, EPaymentMethod } from "../..";

export interface IOrderPayment {
  id?: string;
  amount: number;
  discount: number;
  observation?: string;
  method: EPaymentMethod;
  creditCardName?: string;
  creditCardType?: ECreditCardType;
}

export class IOrderPaymentHandler {
  static empty(): IOrderPayment {
    return {
      amount: 0,
      discount: 0,
      method: EPaymentMethod.CASH,
    };
  }
}
