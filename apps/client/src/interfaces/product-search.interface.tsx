export interface IProductSearch {
  label?: string;
  quantity?: number;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categories?: string[];
  page?: number;
  size?: number;
}
