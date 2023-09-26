export interface IDiscount {
  id?: string;
  label: string;
  minPerOrder: number;
  maxPerOrder: number;
  price: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  expireAt: string;
}
