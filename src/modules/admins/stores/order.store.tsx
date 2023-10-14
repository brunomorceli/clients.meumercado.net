import { IOrder, IOrderSearchResult, IOrderUpdate, IPagination } from "@shared/interfaces";
import { OrderService } from "@admins/services";
import { create } from "zustand";

interface useOrderStoreProps {
  update: (data: IOrderUpdate) => Promise<IOrder>;
  find: (data: IPagination) => Promise<IOrderSearchResult>;
  get: (id: string) => Promise<IOrder>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  update: (data: IOrderUpdate) => OrderService.update(data),
  find: (data: IPagination) => OrderService.find(data),
  get: (id: string) => OrderService.get(id),
}));
