import { EProductType } from "@/enums";
import { v4 as Uuid } from 'uuid';

export enum EProductMeasureType {
  NUMBER='NUMBER',
  OPTION='OPTION',
}
export interface IProductMesarure {
  label: string;
  type: EProductMeasureType;
  unitText: string;
  options: string[];
  value?: any;
  id: string;
}

export class IProductMeasureHandler {
  static empty(): IProductMesarure {
    return {
      label: '',
      type: EProductMeasureType.NUMBER,
      options: [],
      unitText: '',
      id: Uuid(),
    };
  }
}

export interface IProduct {
  id?: string;
  companyId?: string;
  label: string;
  description?: string;
  pictures: string[],
  showPrice: boolean;
  price: number;
  sku?: string;
  barcode?: string;
  discountPrice?: number;
  unlimited: boolean;
  quantity: number;
  categories: string[];
  measures: IProductMesarure[];
  type: EProductType;
}

export class IProductHandler {
  static empty(): IProduct {
    return {
      label: '',
      description: '',
      pictures: [],
      showPrice: true,
      price: 0,
      unlimited: false,
      quantity: 1,
      categories: [],
      measures: [
        { id: Uuid(), label: 'Peso', type: EProductMeasureType.OPTION, unitText: 'G', options: ['A', 'B', 'C'], },
        { id: Uuid(), label: 'Comprimento', type: EProductMeasureType.NUMBER, unitText: 'CM', options: [], },
        { id: Uuid(), label: 'Comprimento', type: EProductMeasureType.NUMBER, unitText: 'CM', options: [], },
        { id: Uuid(), label: 'Altura', type: EProductMeasureType.NUMBER, unitText: 'CM', options: [], },
      ],
      type: EProductType.PHYSIC,
    };
  }
}
