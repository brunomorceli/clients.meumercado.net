import { ICategory, IDiscount } from ".";

export interface IProduct {
  id?: string;
  companyId?: string;
  label: string;
  description?: string;
  cover?: string;
  blob?: string;
  price: number;
  unlimited: boolean;
  quantity: number;
  category?: ICategory;
  discount?: IDiscount;
}

export class IProductHandler {
  static getEmptyProduct(): IProduct {
    return {
      label: '',
      description: '',
      price: 0,
      unlimited: false,
      quantity: 1,
    };
  }
}
