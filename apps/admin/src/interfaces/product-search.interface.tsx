import { IPagination } from ".";

export interface IProductSearch extends IPagination {
  label?: string;
  quantity?: number;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categories?: string[];
  page?: number;
  size?: number;
}