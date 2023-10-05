import { AuthGuard } from "@shared/components";

export default function CheckoutPage() { 
  return (
    <AuthGuard>
      <h5>Checkout</h5>
    </AuthGuard>
  )
}
