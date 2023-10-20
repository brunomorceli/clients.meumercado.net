import { IOrderResult } from ".";

export interface IFindOrderResult {
  total: number;
  data: IOrderResult[];
}
