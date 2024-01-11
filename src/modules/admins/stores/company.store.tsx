import {
  ICompany,
  ICompanySearchResult,
  ICompanySearch,
} from "src/modules/shared/interfaces";
import { CompanyService } from "src/modules/admins/services";
import { create } from "zustand";

interface useCompanyStoreProps {
  update: (data: ICompany) => Promise<ICompany>;
  find: (search: ICompanySearch) => Promise<ICompanySearchResult>;
  get: (id: string) => Promise<ICompany>;
}

export const useCompanyStore = create<useCompanyStoreProps>((set) => ({
  update: (data: ICompany) => CompanyService.update(data),
  find: (search: ICompanySearch) => CompanyService.find(search),
  get: (id: string) => CompanyService.get(id),
}));
