export interface IPagination {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
}