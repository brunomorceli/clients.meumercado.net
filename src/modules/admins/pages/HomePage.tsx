import { TitleBase } from "src/modules/shared";
export default function HomePage() {
  return <TitleBase title="Home - Admins" />;
}

export class HomePageHandler {
  static route(): string {
    return '/admins';
  }
  static navigate(): string {
    return '/admins';
  }
}
