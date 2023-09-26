import { AuthGuard } from "@shared/components";
import { Clients } from "@admins/components";

export default function ProductsPage() {
  return (
    <AuthGuard>
      <Clients />
    </AuthGuard>
  )
}