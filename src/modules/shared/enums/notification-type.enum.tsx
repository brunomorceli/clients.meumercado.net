import { OrdersDetailsHandler } from "src/modules/admins/pages/Orders/OrdersDetailsPage";
import { INotification } from "..";
import { HomePageHandler } from "src/modules/admins/pages/HomePage";

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
        return OrdersDetailsHandler.navigate(notification.orderId!.toString());
      case ENotificationType.UPDATE_ORDER:
        return OrdersDetailsHandler.navigate(notification.orderId!.toString());
      case ENotificationType.CANCEL_ORDER:
        return OrdersDetailsHandler.navigate(notification.orderId!.toString());
      case ENotificationType.DELIVERY_ORDER:
        return OrdersDetailsHandler.navigate(notification.orderId!.toString());
      case ENotificationType.MESSAGE:
        return HomePageHandler.navigate();
    }
  }
}