import { IOrder } from "src/modules/shared";

export interface IFindOrderByUserResult {
  total: number;
  data: IOrder[];
}
