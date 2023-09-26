import { ICompany } from ".";

export interface ICompanySearchResult {
  total: number;
  data: ICompany[];
}
