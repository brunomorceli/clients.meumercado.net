import { IOrderPayment, IOrderProduct } from ".";
import { EDeliveryType, EOrderStatus, IOrderLog, IUser } from "../..";

export interface IOrder {
  id?: number;
  userId?: string;
  user?: IUser;
  companyId?: string;
  status?: EOrderStatus;
  observation?: string;
  orderProducts: IOrderProduct[];
  payments: IOrderPayment[];
  deliveryType: EDeliveryType;
  orderLogs: IOrderLog[];
  createdAt?: string;
  deletedAt?: string;
}

export class IOrderHandler {
  static empty(): IOrder {
    return {
      orderProducts: [],
      deliveryType: EDeliveryType.DELIVERY,
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
