export interface ICreditCard {
  number: string;
  expMonth: number;
  expYear: number;
  cvv: string;
  holderName: string;
}

export class ICreditCardHandler {
  static empty(): ICreditCard {
    return {
      number: '',
      cvv: '',
      holderName: '',
      expMonth: 1,
      expYear: Number(new Date().getFullYear().toString().substring(2)),
    };
  }
}
