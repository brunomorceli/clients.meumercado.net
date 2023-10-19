import { ENotificationTarget, ENotificationType } from "@shared/enums";

export interface INotification {
  id: number;
  label: string;
  target: ENotificationTarget;
  type: ENotificationType;
  userId?: string;
  orderId?: number;
  companyId: string;
  viewed?: boolean;
  createdAt: string;
}
