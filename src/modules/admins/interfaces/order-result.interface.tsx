import { EOrderStatus } from "@root/modules/shared";

export interface IOrderResult {
  id: string;
  userId: string;
  userName: string;
  cpfCnpj: string;
  companyId: string;
  status: EOrderStatus;
  observation?: string;
  total: number;
  productCount: number;
  createdAt: string;
}