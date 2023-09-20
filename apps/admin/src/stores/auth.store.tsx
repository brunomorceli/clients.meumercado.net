import {
  ISignup,
  ICompany,
  IConfirm,
  IAuthentication,
  IAuthenticationHandler,
} from "@/interfaces";
import { ISigninResponse } from "@/interfaces/signin-response.interface";
import { AuthService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  authenticated: boolean;
  auth: IAuthentication;
  signin:(email: string) => Promise<ISigninResponse | null>;
  signup:(data: ISignup) => Promise<any>;
  confirm: (data: IConfirm) => Promise<void>;  
  signout: () => void;
}

export const useAuthStore = create(
  persist<useAuthStoreProps>(
    (set, get) => ({
      authenticated: false,
      auth: IAuthenticationHandler.empty(),
      signin: (email: string) => AuthService.signin(email),
      signup: (data: ISignup) => AuthService.signup(data),
      confirm: (data: IConfirm) => {
        return new Promise((resolve, reject) => {
          AuthService.confirm(data)
            .then((auth) => {
              set({
                ...get(),
                auth,
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
    { name: "auth-store" }
  )
);
