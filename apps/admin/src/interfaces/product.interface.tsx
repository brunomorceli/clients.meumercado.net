import { IDiscount } from ".";

export interface IProduct {
  id?: string;
  label: string;
  description?: string;
  cover?: string;
  blob?: string;
  price: number;
  quantity: number;
  categories: string[];
  discount?: IDiscount;
}

export class IProductHandler {
  static getEmptyProduct(): IProduct {
    return {
      label: '',
      description: '',
      price: 0,
      quantity: 1,
      categories: [],
    };
  }
}
