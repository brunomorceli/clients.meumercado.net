import { EProductType } from "@/enums";
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
  measures: IMeasure[];
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
      measures: IMeasureHandler.getProductDefault(),
      attributes: [],
      type: EProductType.PHYSIC,
    };
  }
}
