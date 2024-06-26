import { EDeliveryType, EOrderStatus } from "src/modules/shared";

export interface IOrderResult {
  id: number;
  userId: string;
  userName: string;
  phoneNumber?: string;
  cpfCnpj: string;
  companyId: string;
  status: EOrderStatus;
  deliveryType: EDeliveryType;
  observation?: string;
  total: number;
  productCount: number;
  createdAt: string;
}