import { AuthGuard } from "@shared";
import { OrderDetails } from "@admins/components/Orders";
import { useRouter } from "next/router";

export default function OrdersPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>
      <OrderDetails orderId={Number(id)} />
    </AuthGuard>
  );
}
