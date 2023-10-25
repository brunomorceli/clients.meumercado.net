import { AuthGuard } from "@shared/components";
import { ProductForm } from "@admins/components";

export default function ProductCreatePage() {
  return (
    <AuthGuard>
      <ProductForm />
    </AuthGuard>
  );
}