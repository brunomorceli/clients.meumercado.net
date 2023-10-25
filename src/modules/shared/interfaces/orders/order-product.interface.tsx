import { IProduct } from "..";
import { v4 as Uuild } from "uuid";

export interface IOrderProduct {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  productId: string;
  product?: IProduct;
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

  static fromProduct(product: IProduct, quantity: number = 1): IOrderProduct {
    return {
      name: product.label,
      quantity,
      price: product.price,
      total: product.price,
      productId: product.id!,
    };
  }
}
