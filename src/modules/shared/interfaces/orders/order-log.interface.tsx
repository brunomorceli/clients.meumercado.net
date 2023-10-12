import { EOrderStatus } from "../..";

export interface IOrderLog {
  id?: string;
  userId?: string;
  orderId?: string;
  status: EOrderStatus;
  observation: string;
  createdAt?: string;
  deletedAt?: string;
}

export class IOrderLogHandler {
  static empty(): IOrderLog {
    return { observation: "", status: EOrderStatus.CANCELED_BY_CLIENT };
  }
}
