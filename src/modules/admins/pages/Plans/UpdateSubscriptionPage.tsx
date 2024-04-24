import { UpdateSubscription } from "../../components";

export default function UpdateSubscriptionPage() {
  return <UpdateSubscription />;
}

export class UpdateSubscriptionPageHandler {
  static route(): string {
    return "/admins/subscriptions/update";
  }
  static navigate(): string {
    return "/admins/subscriptions/update";
  }
}
