import { ECompanyStatusType } from "@/enums";
import { IPagination } from ".";

export interface ICompanySearch extends IPagination {
  ownerId?: string;
  label?: string;
  tenantId?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  status?: ECompanyStatusType;
}
