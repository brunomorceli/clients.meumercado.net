import { ProductDetails } from "src/modules/customers/components";
import { useParams } from 'react-router';

export default function ProductDetailsPage() {
  const { id } = useParams();

  return <ProductDetails id={id as string} />;
}

export class ProductDetailsPageHandler {
  static route(): string {
    return '/products/:id/details';
  }

  static navigate(id: string): string {
    return '/products/:id/details'.replace(':id', id);
  }
}
