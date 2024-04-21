import {
  ISignup,
  IConfirm,
  IAuthenticationHandler,
  ISigninResponse,
} from "../interfaces";
import { ICompany, ICompanyPlan } from "src/modules/shared/interfaces";
import { AuthService } from "src/modules/admins/services";
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
  plan?: ICompanyPlan | null | undefined;
  signin: (email: string) => Promise<ISigninResponse | null>;
  signup: (data: ISignup) => Promise<any>;
  confirm: (data: IConfirm) => Promise<void>;
  updateCompany: (company: ICompany) => void;
  signout: () => void;
  getLastPlan: () => Promise<ICompanyPlan>;
  updatePlan: () => void;
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
      plan: null,

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
                plan: null,
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

      getLastPlan: () => AuthService.getLastPlan(),

      updatePlan: async () => {
        const plan = await AuthService.getLastPlan();
        if (Boolean(plan)) {
          set({ ...get(), plan });
        }

        return Promise.resolve();
      },
    }),

    { name: "admins-auth-store" }
  )
);
