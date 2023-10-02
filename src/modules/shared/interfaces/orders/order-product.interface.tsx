export interface IOrderProduct {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  productId: string;
}

export class IOrderProductHandler {
  static empty(): IOrderProduct {
    return {
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
      productId: '',
    };
  }
}
