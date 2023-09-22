import { ICompany, ICompanySearchResult } from "@/interfaces";
import { ICompanySearch } from "@/interfaces/company-search.interface";
import { CompanyService } from "@/services";
import { create } from "zustand";

interface useCompanyStoreProps {
  update: (data: ICompany) => Promise<ICompany>;
  find: (search: ICompanySearch) => Promise<ICompanySearchResult>;
  get: (id: string) => Promise<ICompany>;
  remove: (id: string) => Promise<void>;
  checkTenantId: (tenantId: string, clientId?: string) => Promise<boolean>;
}

export const useCompanyStore = create<useCompanyStoreProps>((set) => ({
  update: (data: ICompany) => CompanyService.update(data),
  find: (search: ICompanySearch) => CompanyService.find(search),
  get: (id: string) => CompanyService.get(id),
  remove: (id: string) => CompanyService.remove(id),
  checkTenantId: (tenantId: string, clientId?: string) => CompanyService.checkTenantId(tenantId, clientId),
}));
