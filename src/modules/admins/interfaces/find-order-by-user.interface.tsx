import { EOrderStatus, IPagination } from "src/modules/shared";

export interface IFindOrderByUser extends IPagination {
  userId: string;
  status?: EOrderStatus;
}
