import { IOrder } from ".";

export interface IOrderSearchResult {
  total: number;
  data: IOrder[];
}
