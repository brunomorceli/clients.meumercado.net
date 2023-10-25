import { IOrder } from "@root/modules/shared";

export interface IFindOrderByUserResult {
  total: number;
  data: IOrder[];
}
