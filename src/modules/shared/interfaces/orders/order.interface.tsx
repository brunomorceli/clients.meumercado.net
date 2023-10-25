import { IOrderPayment, IOrderProduct } from ".";
import { EOrderStatus, IOrderLog, IUser } from "../..";

export interface IOrder {
  id?: number;
  userId?: string;
  user?: IUser;
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
      status: EOrderStatus.PENDING,
    };
  }

  static total(order: IOrder): number {
    return (
      order.orderProducts.map((op) => op.quantity * op.product?.price!) || []
    ).reduce((total, current) => total + current, 0);
  }
}
