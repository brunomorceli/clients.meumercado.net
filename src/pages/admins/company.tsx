import { AuthGuard } from "@shared/components";
import { CompanyForm } from "@admins/components";
import { useStore } from "zustand";
import { useAuthStore } from "@admins/stores";

export default function CompanyPage() {
  const authStore = useStore(useAuthStore);
  const { companyId } = authStore;

  return (
    <AuthGuard>
      <CompanyForm companyId={companyId} />
    </AuthGuard>
  )
}