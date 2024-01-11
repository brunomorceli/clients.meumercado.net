import { IOrder, IOrderUpdate } from "src/modules/shared";
import { OrderService } from "src/modules/admins/services";
import { create } from "zustand";
import { IFindOrder } from "src/modules/admins/interfaces/find-order.interface";
import { IFindOrderResult } from "src/modules/admins/interfaces/find-order-result.interface";
import { IFindOrderByUser, IFindOrderByUserResult } from "src/modules/admins/interfaces";

interface useOrderStoreProps {
  update: (data: IOrderUpdate) => Promise<IOrder>;
  find: (data: IFindOrder) => Promise<IFindOrderResult>;
  findByUser: (data: IFindOrderByUser) => Promise<IFindOrderByUserResult>;
  get: (id: number) => Promise<IOrder>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  update: (data: IOrderUpdate) => OrderService.update(data),
  find: (data: IFindOrder) => OrderService.find(data),
  findByUser: (data: IFindOrderByUser) => OrderService.findByUser(data),
  get: (id: number) => OrderService.get(id),
}));
