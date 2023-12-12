import { IPagination } from ".";
import { EStatusGroup } from "..";

export interface IProductSearch extends IPagination {
  label?: string;
  quantity?: number;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  statusGroup?: EStatusGroup;
  categories?: string[];
  page?: number;
  size?: number;
  random?: boolean;
  onSale?: boolean;
}
