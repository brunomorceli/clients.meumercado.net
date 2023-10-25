import { IStockProduct } from ".";

export interface ICheckStockResult {
  products: IStockProduct[];
  unlimitedProducts: IStockProduct[];
}
