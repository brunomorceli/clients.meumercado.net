import { ProductDetails } from "@customers/components";
import { useParams } from 'react-router';

export default function ProductDetailsPage() {
  const { id } = useParams();

  return <ProductDetails id={id as string} />;
}
