import { ECompanyStatusType } from "@/enums";
import { IPagination } from ".";

export interface ICompanySearch extends IPagination {
  label?: string;
  subdomain?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  status?: ECompanyStatusType;
}
