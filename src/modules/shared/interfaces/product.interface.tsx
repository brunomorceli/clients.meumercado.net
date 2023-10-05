import { EProductType } from "@shared/enums";
import { IAttribute } from ".";

export interface IProduct {
  id?: string;
  companyId?: string;
  label: string;
  slug?: string;
  description?: string;
  videos: [],
  pictures: string[],
  showPrice: boolean;
  price: number;
  sku?: string;
  barcode?: string;
  discountPrice?: number;
  unlimited: boolean;
  quantity: number;
  quantitySulfix?: string;
  categories: string[];
  width: string;
  height: string;
  length: string;
  weight: string;
  attributes: IAttribute[];
  type: EProductType;
}

export class IProductHandler {
  static empty(): IProduct {
    return {
      label: '',
      description: '',
      videos: [],
      pictures: [],
      showPrice: true,
      price: 0,
      unlimited: false,
      quantity: 1,
      categories: [],
      width: '',
      height: '',
      length: '',
      weight: '',
      attributes: [],
      type: EProductType.PHYSIC,
    };
  }
}
