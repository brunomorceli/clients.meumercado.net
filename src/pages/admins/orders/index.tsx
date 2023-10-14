import { AuthGuard } from "@shared";
import { Orders } from "@admins/components/Orders";

export default function OrdersPage() {
  return (
    <AuthGuard>
      <Orders />
    </AuthGuard>
  );
}
