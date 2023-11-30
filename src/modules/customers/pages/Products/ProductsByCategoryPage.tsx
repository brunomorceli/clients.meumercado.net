import { ProductsByCategory } from "src/modules/customers/components";
import { useParams } from 'react-router';

export default function ProductsByCategoryPage() {
  const { id } = useParams();

  return <ProductsByCategory categoryId={id as string} />;
}

export class ProductsByCategoryPageHandler {
  static route(): string {
    return '/products/:id/by-category';
  }
  static navigate(categoryId: string): string {
    return '/products/:id/by-category'.replace(':id', categoryId);
  }
}
