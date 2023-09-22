import { AuthGuard } from "@/components";
import { ProductForm } from "@/components/Products/Form";

export default function ProductCreatePage() {
  return (
    <AuthGuard>
      <ProductForm />
    </AuthGuard>
  );
}