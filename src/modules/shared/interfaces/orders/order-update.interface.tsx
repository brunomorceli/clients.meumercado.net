import { EOrderStatus } from "../..";

export interface IOrderUpdate {
  id: number;
  observation: string;
  status: EOrderStatus;
}

export class IOrderUpdateHandler {
  static empty(id: number): IOrderUpdate {
    return {
      id,
      observation: '',
      status: EOrderStatus.PENDING,
    };
  }
}
