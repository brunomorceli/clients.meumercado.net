import { ICompany, ICompanySearchResult } from "@/interfaces";
import { ICompanySearch } from "@/interfaces/company-search.interface";
import { CompanyService } from "@/services";
import { create } from "zustand";

interface useCompanyStoreProps {
  upsert: (data: ICompany) => Promise<ICompany>;
  find: (search: ICompanySearch) => Promise<ICompanySearchResult>;
  get: (id: string) => Promise<ICompany>;
  remove: (id: string) => Promise<void>;
}

export const useCompanyStore = create<useCompanyStoreProps>((set) => ({
  upsert: (data: ICompany) => CompanyService.upsert(data),
  find: (search: ICompanySearch) => CompanyService.find(search),
  get: (id: string) => CompanyService.get(id),
  remove: (id: string) => CompanyService.remove(id),
}));
