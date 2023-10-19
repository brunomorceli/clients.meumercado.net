import { EOrderStatus } from "@root/modules/shared";

export interface IOrderResult {
  id: number;
  userId: string;
  userName: string;
  phoneNumber?: string;
  cpfCnpj: string;
  companyId: string;
  status: EOrderStatus;
  observation?: string;
  total: number;
  productCount: number;
  createdAt: string;
}