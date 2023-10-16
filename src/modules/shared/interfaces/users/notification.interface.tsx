import { ENotificationTarget, ENotificationType } from "@shared/enums";

export interface INotification {
  id: number;
  label: string;
  target: ENotificationTarget;
  type: ENotificationType;
  userId?: string;
  orderId?: string;
  companyId: string;
  viewed?: boolean;
  createdAt: string;
}
