import { IOrder, IOrderUpdate } from "@shared/interfaces";
import { OrderService } from "@admins/services";
import { create } from "zustand";
import { IFindOrder } from "../interfaces/find-order.interface";
import { IFindOrderResult } from "../interfaces/find-order-result";

interface useOrderStoreProps {
  update: (data: IOrderUpdate) => Promise<IOrder>;
  find: (data: IFindOrder) => Promise<IFindOrderResult>;
  get: (id: string) => Promise<IOrder>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  update: (data: IOrderUpdate) => OrderService.update(data),
  find: (data: IFindOrder) => OrderService.find(data),
  get: (id: string) => OrderService.get(id),
}));
