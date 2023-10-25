import { AuthGuard } from "@shared/components";
import { Customers } from "@admins/components";

export default function CustomersPage() {
  return (
    <AuthGuard>
      <Customers />
    </AuthGuard>
  )
}