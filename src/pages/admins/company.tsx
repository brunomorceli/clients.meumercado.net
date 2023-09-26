import { AuthGuard } from "@shared/components";
import { Companies } from "@admins/components";

export default function CompanyPage() {
  return (
    <AuthGuard>
      <Companies />
    </AuthGuard>
  )
}