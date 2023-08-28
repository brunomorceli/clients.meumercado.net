import { AuthGuard, Categories } from "@/components";

export default function CategoryPage() {
  return (
    <AuthGuard>
      <Categories />
    </AuthGuard>
  )
}