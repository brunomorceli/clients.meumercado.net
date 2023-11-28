import { IUser } from "src/modules/shared/interfaces";
import { UserService } from "@customers/services";
import { create } from "zustand";

interface useUserStoreProps {
  self: () => Promise<IUser>;
  update: (data: IUser) => Promise<IUser>;
}

export const useUserStore = create<useUserStoreProps>((set) => ({
  self: () => UserService.self(),
  update: (data: IUser) => UserService.update(data),
}));
