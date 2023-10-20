import { EOrderStatus, IPagination } from "@root/modules/shared";

export interface IFindOrderByUser extends IPagination {
  userId: string;
  status?: EOrderStatus;
}
