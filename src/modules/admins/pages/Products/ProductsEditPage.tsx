import { ProductForm } from "src/modules/admins/components";
import { useParams } from "react-router";

export default function ProductsEditPage() {
  const { id } = useParams();

  return <ProductForm productId={id as string} />;
}

export class ProductsEditHandler {
  static route(): string {
    return '/products/edit/:id';
  }
  static navigate(id: string): string {
    return '/admins/products/edit/:id'.replace(':id', id);
  }
}
