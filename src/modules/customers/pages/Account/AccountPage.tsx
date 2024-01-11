import { Account } from "src/modules/customers/components";

export default function AccountPage() {
  return <Account />;
}

export class AccountPageHandler {
  static route(): string {
    return '/account';
  }
  static navigate(): string {
    return '/account';
  }
}
