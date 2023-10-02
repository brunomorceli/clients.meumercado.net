import { IProduct, IProductSearchResult } from "@shared/interfaces";
import { IProductSearch } from "@shared/interfaces/product-search.interface";
import { ProductService } from "@customers/services";
import { create } from "zustand";

interface useProductStoreProps {
  upsert: (data: IProduct) => Promise<IProduct>;
  find: (search: IProductSearch) => Promise<IProductSearchResult>;
  get: (id: string) => Promise<IProduct>;
  remove: (id: string) => Promise<void>;
}

export const useProductStore = create<useProductStoreProps>((set) => ({
  upsert: (data: IProduct) => ProductService.upsert(data),
  find: (search: IProductSearch) => ProductService.find(search),
  get: (id: string) => ProductService.get(id),
  remove: (id: string) => ProductService.remove(id),
}));
