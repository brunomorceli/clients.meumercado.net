import { PublicGuard } from "@shared/components";

export default function CustomersPage() {
  return (
    <PublicGuard>
      <h5>Home - customers</h5>
    </PublicGuard>
  )
}
