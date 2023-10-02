import { IOrder, IOrderSearchResult, IPagination } from "@shared/interfaces";
import { OrderService } from "@customers/services";
import { create } from "zustand";

interface useOrderStoreProps {
  create: (data: IOrder) => Promise<IOrder>;
  list: (data: IPagination) => Promise<IOrderSearchResult>;
  get: (id: string) => Promise<IOrder>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  create: (data: IOrder) => OrderService.create(data),
  list: (data: IPagination) => OrderService.list(data),
  get: (id: string) => OrderService.get(id),
}));
