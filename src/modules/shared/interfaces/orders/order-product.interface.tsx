import { IProduct } from "..";
import { v4 as Uuild } from "uuid";

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

  static fromProduct(product: IProduct): IOrderProduct {
    return {
      name: product.label,
      quantity: 1,
      price: product.price,
      total: product.price,
      productId: product.id!,
    };
  }
}
