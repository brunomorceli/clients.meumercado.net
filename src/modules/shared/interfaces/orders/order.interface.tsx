import { IOrderPayment, IOrderProduct } from ".";
import { EOrderStatus, IOrderLog } from "../..";

export interface IOrder {
  id?: number;
  userId?: string;
  companyId?: string;
  status?: EOrderStatus;
  observation?: string;
  orderProducts: IOrderProduct[];
  payments: IOrderPayment[];
  orderLogs: IOrderLog[];
  createdAt?: string;
  deletedAt?: string;
}

export class IOrderHandler {
  static empty(): IOrder {
    return {
      orderProducts: [],
      payments: [],
      orderLogs: [],
    };
  }
}
