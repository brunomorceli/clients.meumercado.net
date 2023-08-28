import { AuthGuard, ProductsAdmin } from "@/components";

export default function ProductsPage() {
  return (
    <AuthGuard>
      <ProductsAdmin />
    </AuthGuard>
  )
}