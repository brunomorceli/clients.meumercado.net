import { CustomerForm } from "src/modules/admins/components";

export default function CustomersCreatePage() {
  return <CustomerForm />;
}

export class CustomersCreateHandler {
  static route(): string {
    return '/admins/customers/create';
  }
  static navigate(): string {
    return '/admins/customers/create';
  }
}
