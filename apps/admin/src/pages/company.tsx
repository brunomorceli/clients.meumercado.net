import { AuthGuard, Companies } from "@/components";

export default function CompanyPage() {
  return (
    <AuthGuard>
      <Companies />
    </AuthGuard>
  )
}