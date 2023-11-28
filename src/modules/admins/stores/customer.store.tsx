import { IUser, IUserSearch, IUserSearchResult } from "src/modules/shared/interfaces";
import { CustomerService } from "src/modules/admins/services";
import { create } from "zustand";

interface useCustomerStoreProps {
  create: (data: IUser) => Promise<IUser>;
  update: (data: IUser) => Promise<IUser>;
  find: (search: IUserSearch) => Promise<IUserSearchResult>;
  get: (id: string) => Promise<IUser>;
  remove: (id: string) => Promise<void>;
}

export const useCustomerStore = create<useCustomerStoreProps>((set) => ({
  create: (data: IUser) => CustomerService.create(data),
  update: (data: IUser) => CustomerService.update(data),
  find: (search: IUserSearch) => CustomerService.find(search),
  get: (id: string) => CustomerService.get(id),
  remove: (id: string) => CustomerService.remove(id),
}));
