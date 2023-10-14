import { EOrderStatus, IPagination } from "@root/modules/shared";

export interface IFindOrder extends IPagination {
  userId?: string;
  status?: EOrderStatus;
  userName?: string;
  cpfCnpj?: string;
  email?: string;
  productName?: string;
}
