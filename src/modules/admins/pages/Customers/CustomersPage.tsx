import { Customers } from "src/modules/admins/components";

export default function CustomersPage() {
  return <Customers />;
}

export class CustomersHandler {
  static route(): string {
    return '/admins/customers';
  }
  static navigate(): string {
    return '/admins/customers';
  }
}
