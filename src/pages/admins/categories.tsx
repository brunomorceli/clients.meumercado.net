import { AuthGuard } from "@shared/components";
import { Categories } from "@admins/components";

export default function CategoryPage() {
  return (
    <AuthGuard>
      <Categories />
    </AuthGuard>
  )
}