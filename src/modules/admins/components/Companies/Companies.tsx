import { useStore } from "zustand";
import { CompanyForm } from ".";
import { useAuthStore, useToasterStore } from "@shared/stores";
import { useCompanyStore } from "@admins/stores";
import { useEffect, useState } from "react";
import { ICompany, ICompanyHandler } from "@shared/interfaces";
import { TitleBase } from "@shared/components";
import { useRouter } from "next/router";

export function Companies() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());

  useEffect(() => {
    companyStore
      .get(authStore.companyId)
      .then((c) => setCompany(c))
      .catch((e) => toasterStore.error(e));
  }, [toasterStore, companyStore, authStore.companyId]);

  function handleSave(newCompany: ICompany): void {
    companyStore
      .update(newCompany)
      .then((updatedCompany) => {
        setCompany(updatedCompany);
        authStore.updateCompany(updatedCompany);
        toasterStore.success('Empresa atualizada com sucesso.');
      })
      .catch(toasterStore.error);
  }

  return (
    <>
      <TitleBase title="Minha empresa" onBack={() => router.replace("/admins")} />
      <CompanyForm company={company} onSave={handleSave} />
    </>
  );
}
