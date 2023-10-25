import { AuthGuard } from "@shared/components";
import { CustomerForm } from "@admins/components";

export default function CustomersPage() {
  return (
    <AuthGuard>
      <CustomerForm />
    </AuthGuard>
  )
}
