import { AuthGuard, Clients } from "@/components";

export default function ProductsPage() {
  return (
    <AuthGuard>
      <Clients />
    </AuthGuard>
  )
}