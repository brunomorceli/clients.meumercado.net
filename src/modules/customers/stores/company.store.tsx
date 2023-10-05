import { ICompany, ICompanyHandler } from "@shared/interfaces";
import { create } from "zustand";
import { CompanyService } from "../services/company.service";
import { persist } from "zustand/middleware";

interface useCompanyStoreProps {
  company: ICompany;
  get: () => Promise<ICompany>;
}

export const useCompanyStore = create(
  persist<useCompanyStoreProps>(
    (set, get) => ({
      company: ICompanyHandler.empty(),
      get: () => {
        return new Promise((resolve, reject) => {
          CompanyService.get()
            .then((company) => {
              set({ ...get(), company });
              resolve(company);
            })
            .catch(reject);
        });
      },
    }),
    { name: "customers-company" }
  )
);
