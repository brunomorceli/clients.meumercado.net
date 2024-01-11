import { IPagination, IProductBase } from ".";

export interface IProductBaseSearchResult extends IPagination {
  total: number;
  data: IProductBase[];
}

export class IProductBaseSearchResultHandler {
  static empty(): IProductBaseSearchResult {
    return {
      data: [],
      total: 0,
      limit: 20,
      orderBy: 'desc',
      page: 0,
    }
  }
}