import { OrderDetails } from "src/modules/admins/components/Orders";
import { useParams } from "react-router";

export default function OrdersDetailsPage() {
  const { id } = useParams();

  return <OrderDetails orderId={Number(id)} />;
}

export class OrdersDetailsHandler {
  static route(): string {
    return '/orders/details/:id';
  }
  static navigate(id: string): string {
    return '/admins/orders/details/:id'.replace(':id', id);
  }
}
