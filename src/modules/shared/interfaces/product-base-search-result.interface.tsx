import { IProductBase } from ".";

export interface IProductBaseSearchResult {
  total: number;
  data: IProductBase[];
}
