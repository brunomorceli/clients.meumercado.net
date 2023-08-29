import { IAuthentication, IAuthenticationHandler, IConfirm, ISignin } from "@/interfaces";
import { AuthService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  authenticated: boolean;
  auth: IAuthentication;
  signin: (data: ISignin) => Promise<void>;
  confirm: (data: IConfirm) => Promise<void>;
  signout: () => void;
}

export const useAuthStore = create(
  persist<useAuthStoreProps>(
    (set, get) => ({
      authenticated: false,
      auth: IAuthenticationHandler.empty(),
      signin: (data: ISignin) => AuthService.signin(data),
      confirm: (data: IConfirm) => {
        return new Promise((resolve, reject) => {
          AuthService.confirm(data)
            .then((d) => {
              set({
                ...get(),
                auth: d,
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
          auth: IAuthenticationHandler.empty(),
        });
      },
    }),
    { name: 'auth-store' }
  )
);
