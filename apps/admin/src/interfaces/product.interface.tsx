import { ICategory, IDiscount } from ".";

export interface IProduct {
  id?: string;
  companyId?: string;
  label: string;
  description?: string;
  pictures: string[],
  showPrice: boolean;
  price: number;
  discountPrice?: number;
  unlimited: boolean;
  quantity: number;
  category?: ICategory;
}

export class IProductHandler {
  static getEmptyProduct(): IProduct {
    return {
      label: '',
      description: '',
      pictures: [],
      showPrice: true,
      price: 0,
      unlimited: false,
      quantity: 1,
    };
  }
}
