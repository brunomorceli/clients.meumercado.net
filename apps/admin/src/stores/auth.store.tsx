import {
  IAuthentication,
  IAuthenticationHandler,
  ICompany,
  IConfirm,
  ISignin,
} from "@/interfaces";
import { AuthService, CompanyService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  authenticated: boolean;
  auth: IAuthentication;
  signin: (data: ISignin) => Promise<void>;
  confirm: (data: IConfirm) => Promise<void>;
  signout: () => void;
  updateCompanies: () => Promise<void>;
  setSelectedCompany: (companyId: string) => void;
}

function getSelectedCompany(
  selectedCompany: ICompany | null,
  newList: ICompany[]
): ICompany | null {
  if (newList.length === 0) {
    return null;
  }

  if (!selectedCompany || !newList.some((c) => c.id === selectedCompany.id)) {
    return newList[0];
  }

  return newList.find((c) => c.id === selectedCompany.id) || null;
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
                auth: {
                  ...d,
                  selectedCompany: getSelectedCompany(null, d.companies),
                },
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

      updateCompanies: async () => {
        const cache = get();
        if (!cache.authenticated) {
          return;
        }

        const findResult = await CompanyService.findByOwner();

        set({
          ...cache,
          auth: {
            ...cache.auth,
            companies: findResult.data,
            selectedCompany: getSelectedCompany(
              cache.auth.selectedCompany,
              findResult.data
            ),
          },
        });

        return Promise.resolve();
      },

      setSelectedCompany: (companyId: string): void => {
        const cache: any = get();
        if (!cache.authenticated) {
          return;
        }

        const selectedCompany = cache.auth.companies.find((c: ICompany) => c.id === companyId);
        if (!selectedCompany) {
          return;
        }

        cache.auth.selectedCompany = selectedCompany;
        set({ ...cache });
      },
    }),
    { name: "auth-store" }
  )
);
