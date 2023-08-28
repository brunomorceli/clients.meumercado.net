import { IConfirm, ISignin } from "@/interfaces";
import { UserService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserStoreProps {
  authenticated: boolean;
  data: any;
  signin: (data: ISignin) => Promise<void>;
  confirm: (data: IConfirm) => Promise<void>;
  signout: () => void;
}

export const useUserStore = create(
  persist<useUserStoreProps>(
    (set, get) => ({
      authenticated: false,
      data: {},
      signin: (data: ISignin) => UserService.signin(data),
      confirm: (data: IConfirm) => {
        return new Promise((resolve, reject) => {
          UserService.confirm(data)
            .then((d) => {
              set({
                ...get(),
                data: d,
                authenticated: true,
              });

              resolve();
            })
            .catch(reject);
        });
      },
      signout: () => {
        set({
          ...get(),
          authenticated: false,
          data: {},
        });
      },
    }),
    { name: 'user-store' }
  )
);
