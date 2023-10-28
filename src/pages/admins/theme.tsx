import { AuthGuard } from "@shared/components";
import { ProductThemeForm } from "@admins/components";
import { useStore } from "zustand";
import { useAuthStore } from "@admins/stores";

export default function CompanyPage() {
  const authStore = useStore(useAuthStore);
  const { companyId } = authStore;

  return (
    <AuthGuard>
      <ProductThemeForm companyId={companyId} />
    </AuthGuard>
  )
}