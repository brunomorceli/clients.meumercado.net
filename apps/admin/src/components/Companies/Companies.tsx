import { useStore } from "zustand";
import { CompanyForm } from ".";
import { useAuthStore, useCompanyStore } from "@/stores";
import { useEffect, useState } from "react";
import { ICompany } from "@/interfaces";
import { TitleBase } from "..";
import { useRouter } from "next/router";
import { message } from "antd";

export function Companies() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(authStore.auth.company!);

  useEffect(() => {
    setCompany(authStore.auth.company!);
  }, [authStore.auth.company]);

  function handleSave(newCompany: ICompany): void {
    companyStore
      .upsert(newCompany)
      .then((updatedCompany) => {
        authStore.setCompany(updatedCompany);
        message.success('Empresa atualizada com sucesso.');
      })
      .catch(message.error);
  }

  return (
    <>
      <TitleBase title="Minha empresa" onBack={() => router.replace("/")} />
      <CompanyForm company={company} onSave={handleSave} />
    </>
  );
}
