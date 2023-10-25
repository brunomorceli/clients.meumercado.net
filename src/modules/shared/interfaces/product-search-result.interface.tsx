import { IProduct } from ".";

export interface IProductSearchResult {
  total: number;
  data: IProduct[];
}
