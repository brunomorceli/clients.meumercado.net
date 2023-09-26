import { ICategory } from "@shared/interfaces";
import { CategoryService } from "@shared/services";
import { create } from "zustand";

interface useCategoryStoreProps {
  upsert: (data: ICategory) => Promise<ICategory>;
  list: () => Promise<ICategory[]>;
  get: (id: string) => Promise<ICategory>;
  remove: (id: string) => Promise<void>;
}

export const useCategoryStore = create<useCategoryStoreProps>((set) => ({
  upsert: (data: ICategory) => CategoryService.upsert(data),
  list: () => CategoryService.list(),
  get: (id: string) => CategoryService.get(id),
  remove: (id: string) => CategoryService.remove(id),
}));
