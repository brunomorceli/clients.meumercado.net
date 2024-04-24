export interface ICreditCard {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
  holderDocument: string;
}

export class ICreditCardHandler {
  static empty(): ICreditCard {
    return {
      cardNumber: "",
      holderName: "",
      expiryDate: "",
      cvv: "",
      holderDocument: "",
    };
  }

  static toPagarme(card: ICreditCard): any {
    const parts = (card.expiryDate || "").split("/");
    return {
      number: card.cardNumber,
      expMonth: Number(parts[0]),
      expYear: parts.length === 2 ? Number(parts[1]) : 0,
      cvv: card.cvv,
      holderName: card.holderName,
      holderDocument: card.holderDocument,
    };
  }
}
