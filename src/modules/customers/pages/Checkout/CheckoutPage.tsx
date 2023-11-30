import { OrderCheckout } from "src/modules/customers/components";

export default function CheckoutPage() {
  return <OrderCheckout />;
}

export class CheckoutPageHandler {
  static route(): string {
    return '/checkout';
  }
  static navigate(): string {
    return '/checkout';
  }
}
