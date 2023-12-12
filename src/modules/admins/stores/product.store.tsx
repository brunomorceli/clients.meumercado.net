import { IProduct, IProductSearchResult, IProductSearch, IProductBaseSearchResult, IProductBaseSearch } from "src/modules/shared";
import { ProductService } from "src/modules/admins/services";
import { create } from "zustand";

interface useProductStoreProps {
  upsert: (data: IProduct) => Promise<IProduct>;
  find: (search: IProductSearch) => Promise<IProductSearchResult>;
  findBaseProducts: (search: IProductBaseSearch) => Promise<IProductBaseSearchResult>;
  get: (id: string) => Promise<IProduct>;
  remove: (id: string) => Promise<void>;
}

export const useProductStore = create<useProductStoreProps>((set) => ({
  upsert: (data: IProduct) => ProductService.upsert(data),
  find: (search: IProductSearch) => ProductService.find(search),
  findBaseProducts: (search: IProductBaseSearch) => ProductService.findBaseProduct(search),
  get: (id: string) => ProductService.get(id),
  remove: (id: string) => ProductService.remove(id),
}));
