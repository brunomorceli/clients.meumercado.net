import { AuthGuard } from "@shared/components";
import { Products } from "@admins/components";

export default function ProductListPage() {
  return (
    <AuthGuard>
      <Products />
    </AuthGuard>
  );
}
