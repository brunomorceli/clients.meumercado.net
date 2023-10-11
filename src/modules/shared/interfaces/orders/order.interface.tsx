import { IOrderPayment, IOrderProduct } from ".";
import { EOrderStatus } from "../..";

export interface IOrder {
  id?: string;
  userId?: string;
  companyId?: string;
  status?: EOrderStatus;
  observation?: string;
  orderProducts: IOrderProduct[];
  payments: IOrderPayment[];
  createdAt?: string;
  pendingAt?: string;
  preparingAt?: string;
  shippingAt?: string;
  deliveringAt?: string;
  doneAt?: string;
  canceledByCompanyAt?: string;
  canceledByClientAt?: string;
  deletedAt?: string;
}

export class IOrderHandler {
  static empty(): IOrder {
    return {
      orderProducts: [],
      payments: [],
    };
  }
}
