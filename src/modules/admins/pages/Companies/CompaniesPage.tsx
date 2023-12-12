import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";

import { CompanyForm } from "src/modules/admins/components";
import { useAuthStore } from "src/modules/admins/stores";
import { TitleBase } from "src/modules/shared";
import { HomePageHandler } from "../HomePage";

export default function CompaniesPage() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const { companyId } = authStore;

  return (
    <>
      <TitleBase
        onBack={() => navigate(HomePageHandler.navigate())}
        title="Minha empresa"
      />
      <CompanyForm companyId={companyId} />
    </>
  );
}

export class CompaniesHandler {
  static route(): string {
    return "/admins/companies";
  }
  static navigate(): string {
    return "/admins/companies";
  }
}
