import { IProduct, IProductHandler } from ".";

export interface ICartProduct {
  quantity: number;
  product: IProduct;
}

export class ICartProductHandler {
  static empty(product?: IProduct): ICartProduct {
    return {
      quantity: 1,
      product: product || IProductHandler.empty(),
    };
  }
}
