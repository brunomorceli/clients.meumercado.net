import {
  IAuthenticate,
  IAuthentication,
  IAuthenticationHandler,
  ICompany,
  IConfirm,
} from "@/interfaces";
import { AuthService, CompanyService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  authenticated: boolean;
  auth: IAuthentication;
  authenticate:(data: IAuthenticate) => Promise<any>;
  confirm: (data: IConfirm) => Promise<void>;
  setCompany: (company: ICompany) => void,
  
  signout: () => void;
}

export const useAuthStore = create(
  persist<useAuthStoreProps>(
    (set, get) => ({
      authenticated: false,
      auth: IAuthenticationHandler.empty(),
      authenticate: (data: IAuthenticate) => AuthService.authenticate(data),
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

      setCompany: (company: ICompany) => {
        const cache = get();
        if (!cache.authenticated) {
          return;
        }

        set({
          ...cache,
          auth: { ...cache.auth, company },
        });
      },
    }),
    { name: "auth-store" }
  )
);
