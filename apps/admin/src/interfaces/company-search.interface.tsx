import { ECompanyStatusType } from "@/enums";
import { IPagination } from ".";

export interface ICompanySearch extends IPagination {
  ownerId?: string;
  label?: string;
  subdomain?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  status?: ECompanyStatusType;
}
