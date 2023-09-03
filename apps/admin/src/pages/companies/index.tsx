import { AuthGuard } from "@/components";
import { Companies } from "@/components/Companies";

export default function CompaniesHome() {
  return (
    <AuthGuard>
      <Companies />
    </AuthGuard>
  )
}