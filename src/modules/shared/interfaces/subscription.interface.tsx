import { EPlan } from "../enums";

export interface ISubscription {
  id?: string;
  plan: EPlan;
  isActive: boolean;
  isCancelled: boolean;
  createdAt: string;
  cancelledAt: string;
  expiredAt: string;
}
