import { INotification } from "..";

export enum ENotificationType {
  NEW_ORDER = "NEW_ORDER",
  UPDATE_ORDER = "UPDATE_ORDER",
  CANCEL_ORDER = "CANCEL_ORDER",
  DELIVERY_ORDER = "DELIVERY_ORDER",
  MESSAGE = "MESSAGE",
}

export class ENotificationTypeHandler {
  static adminPath(notification: INotification): string {
    switch(notification.type) {
      case ENotificationType.NEW_ORDER:
        return `/admins/orders/${notification.orderId}`;
      case ENotificationType.UPDATE_ORDER:
        return `/admins/orders/${notification.orderId}`;
      case ENotificationType.CANCEL_ORDER:
        return `/admins/orders/${notification.orderId}`;
      case ENotificationType.DELIVERY_ORDER:
        return `/admins/orders/${notification.orderId}`;
      case ENotificationType.MESSAGE:
        return `/admins`
    }
  }
}