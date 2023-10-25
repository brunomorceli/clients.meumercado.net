import { ProductsByCategory } from "@customers/components";
import { useRouter } from "next/router";

export default function ProductByCategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  return <ProductsByCategory categoryId={id as string} />;
}
