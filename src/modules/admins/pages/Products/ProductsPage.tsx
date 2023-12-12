import { Products } from "src/modules/admins/components";

export default function ProductsPage() {
  return <Products />;
}

export class ProductsHandler {
  static route(): string {
    return '/admins/products';
  }
  static navigate(): string {
    return '/admins/products';
  }
}