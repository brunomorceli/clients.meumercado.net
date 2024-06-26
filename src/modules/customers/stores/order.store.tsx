import { ICheckStock, ICheckStockResult, IOrder, IOrderSearchResult, IPagination } from "src/modules/shared/interfaces";
import { OrderService } from "src/modules/customers/services";
import { create } from "zustand";

interface useOrderStoreProps {
  create: (data: IOrder) => Promise<IOrder>;
  list: (data: IPagination) => Promise<IOrderSearchResult>;
  get: (id: number) => Promise<IOrder>;
  cancel: (id: number, observation: string) => Promise<IOrder>;
  checkStock: (data: ICheckStock) => Promise<ICheckStockResult>;
}

export const useOrderStore = create<useOrderStoreProps>((set) => ({
  create: (data: IOrder) => OrderService.create(data),
  list: (data: IPagination) => OrderService.list(data),
  get: (id: number) => OrderService.get(id),
  cancel: (id: number, observation: string) => OrderService.cancel(id, observation),
  checkStock: (data: ICheckStock) => OrderService.checkStock(data),
}));
