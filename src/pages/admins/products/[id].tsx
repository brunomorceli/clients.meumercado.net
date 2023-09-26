import { AuthGuard } from "@shared/components";
import { ProductForm } from "@admins/components";
import { useRouter } from "next/router";

export default function ProductCreatePage() {
  const router = useRouter();
  const {id} = router.query;

  return (
    <AuthGuard>
      <ProductForm productId={id as string} />
    </AuthGuard>
  );
}