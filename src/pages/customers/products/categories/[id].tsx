import { ProductsByCategory } from "@customers/components";
import { useParams } from 'react-router';

export default function ProductByCategoryPage() {
  const { id } = useParams();

  return <ProductsByCategory categoryId={id as string} />;
}
