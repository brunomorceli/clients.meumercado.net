import { AuthGuard } from "@shared/components";

export default function OrdersPage() { 
  return (
    <AuthGuard>
      <h5>Meus pedidos</h5>
    </AuthGuard>
  )
}
