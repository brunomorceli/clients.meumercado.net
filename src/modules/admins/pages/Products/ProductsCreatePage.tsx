import { ProductForm } from "src/modules/admins/components";

export default function ProductsCreatePage() {
  return <ProductForm />;
}

export class ProductsCreateHandler {
  static route(): string {
    return '/admins/products/create';
  }
  static navigate(): string {
    return '/admins/products/create';
  }
}