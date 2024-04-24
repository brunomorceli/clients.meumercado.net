import { SubscriptionDetails } from "../../components";

export default function SubscriptionDetailsPage() {
  return <SubscriptionDetails />;
}

export class SubscriptionDetailsPageHandler {
  static route(): string {
    return "/admins/subscriptions/details";
  }
  static navigate(): string {
    return "/admins/subscriptions/details";
  }
}
