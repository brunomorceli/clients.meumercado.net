import { IOrderPayment, IOrderProduct } from ".";
import { EOrderStatus } from "../..";

export interface IOrder {
  id?: string;
  userId?: string;
  companyId?: string;
  status?: EOrderStatus;
  observation?: string;
  products: IOrderProduct[];
  payments: IOrderPayment[];
  createdAt?: string;
  deletedAt?: string;
}

export class IOrderHandler {
  static empty(): IOrder {
    return {
      products: [],
      payments: [],
    };
  }
}
