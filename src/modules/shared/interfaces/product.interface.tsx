import { EProductType } from "@shared/enums";
import { IAttribute, IMeasure, IMeasureHandler } from ".";

export interface IProduct {
  id?: string;
  companyId?: string;
  label: string;
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
