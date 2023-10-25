import { OrderCheckout } from "@root/modules/customers/components";
import { AuthGuard } from "@shared/components";

export default function CheckoutPage() { 
  return (
    <AuthGuard>
      <OrderCheckout />
    </AuthGuard>
  )
}
