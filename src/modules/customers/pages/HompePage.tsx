import { CustomerHome } from "src/modules/customers/components";

export default function HompePage() {
  return <CustomerHome />;
}

export class HomePageHandler {
  static route(): string {
    return '/';
  }

  static navigate(): string {
    return '/';
  }
}
