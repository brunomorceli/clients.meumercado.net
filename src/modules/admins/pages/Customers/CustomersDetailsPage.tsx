import { CustomerDetails } from "src/modules/admins/components";
import { useParams } from "react-router";

export default function CustomersDetailsPage() {
  const { id } = useParams();
  return <CustomerDetails userId={id as string} />;
}

export class CustomersDetailsHandler {
  static route(): string {
    return '/customers/details/:id';
  }
  static navigate(id: string): string {
    return '/admins/customers/details/:id'.replace(':id', id);
  }
}