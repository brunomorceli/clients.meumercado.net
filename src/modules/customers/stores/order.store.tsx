import { IOrder, IOrderSearchResult, IPagination } from "@shared/interfaces";
import { OrderService } from "@customers/services";
import { create } from "zustand";

interface useOrderStoreProps {
  create: (data: IOrder) => Promise<IOrder>;
  list: (data: IPagination) => Promise<IOrderSearchResult>;
  get: (id: number) => Promise<IOrder>;
  cancel: (id: number, observation: string) => Promise<IOrder>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  create: (data: IOrder) => OrderService.create(data),
  list: (data: IPagination) => OrderService.list(data),
  get: (id: number) => OrderService.get(id),
  cancel: (id: number, observation: string) => OrderService.cancel(id, observation),
}));
