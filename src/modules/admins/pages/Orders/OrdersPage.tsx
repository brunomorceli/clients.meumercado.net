import { Orders } from "src/modules/admins/components/Orders";

export default function OrdersPage() {
  return <Orders />;
}

export class OrdersHandler {
  static route(): string {
    return '/admins/orders';
  }
  static navigate(): string {
    return '/admins/orders';
  }
}
