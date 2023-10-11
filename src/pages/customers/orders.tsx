import { Orders } from "@root/modules/customers/components/Orders/Orders";
import { AuthGuard } from "@shared/components";

export default function OrdersPage() { 
  return (
    <AuthGuard>
      <h5>Meus pedidos</h5>
      <Orders />
    </AuthGuard>
  )
}
