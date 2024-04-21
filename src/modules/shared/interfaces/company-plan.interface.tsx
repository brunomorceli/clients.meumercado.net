import { ECompanyPlanType } from "../enums";

export interface ICompanyPlan {
  id?: string;
  type: ECompanyPlanType;
  isActive: boolean;
  isCancelled: boolean;
  createdAt: string;
  cancelledAt: string;
  expiredAt: string;
}
