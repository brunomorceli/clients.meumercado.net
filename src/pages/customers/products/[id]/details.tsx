import { ProductDetails } from "@customers/components";

import { useRouter } from "next/router";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  return <ProductDetails id={id as string} />;
}
