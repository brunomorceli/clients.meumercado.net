import { EOrderStatus } from "../..";

export interface IOrderUpdate {
  id: string;
  observation: string;
  status: EOrderStatus;
}

export class IOrderUpdateHandler {
  static empty(id: string): IOrderUpdate {
    return {
      id,
      observation: '',
      status: EOrderStatus.PENDING,
    };
  }
}
