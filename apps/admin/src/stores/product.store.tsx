import { IProduct, IProductSearchResult } from "@/interfaces";
import { IProductSearch } from "@/interfaces/product-search.interface";
import { ProductService } from "@/services";
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
