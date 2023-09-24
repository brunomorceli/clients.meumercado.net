import { useStore } from "zustand";
import { CompanyForm } from ".";
import { useAuthStore, useCompanyStore, useToasterStore } from "@/stores";
import { useEffect, useState } from "react";
import { ICompany, ICompanyHandler } from "@/interfaces";
import { TitleBase } from "..";
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
  }, []);

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
      <TitleBase title="Minha empresa" onBack={() => router.replace("/")} />
      <CompanyForm company={company} onSave={handleSave} />
    </>
  );
}
