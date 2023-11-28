import { TitleBase } from "src/modules/shared";

export default function PlansPage() {
  return <TitleBase title="Dados do plano" />;
}

export class PlansPageHandler {
  static route(): string {
    return '/plans/';
  }
  static navigate(): string {
    return '/admins/plans';
  }
}
