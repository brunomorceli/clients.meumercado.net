import { ECompanyStatusType } from "@shared/enums";
import { IPagination } from ".";

export interface ICompanySearch extends IPagination {
  ownerId?: string;
  name?: string;
  tenantId?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  status?: ECompanyStatusType;
}
