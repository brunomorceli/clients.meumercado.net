import { AuthGuard, ProductsClient } from "@/components";

export default function ProductsPage() {
  return (
    <AuthGuard>
      <ProductsClient />
    </AuthGuard>
  )
}