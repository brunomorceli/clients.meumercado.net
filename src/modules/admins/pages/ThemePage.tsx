import { ProductThemeForm } from "src/modules/admins/components";
import { useStore } from "zustand";
import { useAuthStore } from "src/modules/admins/stores";

export default function ThemePage() {
  const authStore = useStore(useAuthStore);
  const { companyId } = authStore;

  return <ProductThemeForm companyId={companyId} />;
}

export class ThemePageHandler {
  static route(): string {
    return '/admins/theme';
  }

  static navigate(): string {
    return '/admins/theme';
  }
}