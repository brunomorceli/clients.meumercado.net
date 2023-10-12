import { Orders } from "@root/modules/customers/components/Orders/Orders";
import { AuthGuard, TitleBase } from "@shared/components";

export default function OrdersPage() { 
  return (
    <AuthGuard>
      <TitleBase title="Meus pedidos" />
      <Orders />
    </AuthGuard>
  )
}
