import { AuthGuard } from "@/components";
import { ProductForm } from "@/components/Products/Form";
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