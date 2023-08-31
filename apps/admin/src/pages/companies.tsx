import { AuthGuard } from "@/components";
import { Companies } from "@/components/Companies";

export default function CompaniesPage() {
  return (
    <AuthGuard>
      <Companies />
    </AuthGuard>
  )
}