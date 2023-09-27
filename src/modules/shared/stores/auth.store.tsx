import {
  ISignup,
  IConfirm,
  IAuthenticationHandler,
  ISigninResponse,
} from "@admins/interfaces";
import { ICompany } from "@shared/interfaces";
import { AuthService } from "@shared/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  authenticated: boolean;
  token: string;
  userName: string;
  companyId: string;
  tenantId: string;
  companyName: string;
  logo?: string | null | undefined;
  signin: (email: string) => Promise<ISigninResponse | null>;
  signup: (data: ISignup) => Promise<any>;
  confirm: (data: IConfirm) => Promise<void>;
  updateCompany: (company: ICompany) => void;
  signout: () => void;
}

export const useAuthStore = create(
  persist<useAuthStoreProps>(
    (set, get) => ({
      authenticated: false,
      token: "",
      userName: "",
      roles: [],
      companyId: "",
      tenantId: "",
      companyName: "",
      logo: null,

      signin: (email: string) => AuthService.signin(email),

      signup: (data: ISignup) => AuthService.signup(data),

      confirm: (data: IConfirm) => {
        return new Promise((resolve, reject) => {
          AuthService.confirm(data)
            .then((auth) => {
              set({
                ...get(),
                authenticated: true,
                token: auth.token,
                userName: auth.userName,
                companyId: auth.companyId,
                tenantId: auth.tenantId,
                companyName: auth.companyName,
                logo: auth.logo,
              });

              resolve();
            })
            .catch(reject);
        });
      },

      updateCompany: (company: ICompany) => {
        set({
          ...get(),
          companyName: company.name,
          logo: company.logo,
        });
      },

      signout: () => {
        set({
          ...get(),
          authenticated: false,
          ...IAuthenticationHandler.empty(),
        });
      },
    }),

    { name: "auth-store" }
  )
);
