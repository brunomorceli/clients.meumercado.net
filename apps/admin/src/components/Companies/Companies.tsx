import { useStore } from "zustand";
import { CompanyForm } from ".";
import { useAuthStore, useCompanyStore } from "@/stores";
import { useEffect, useState } from "react";
import { ICompany, ICompanyHandler } from "@/interfaces";
import { TitleBase } from "..";
import { useRouter } from "next/router";
import { message } from "antd";

export function Companies() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());

  useEffect(() => {
    companyStore
      .get(authStore.auth.company.id)
      .then((c) => setCompany(c))
      .catch((e) => message.error(e));
  }, []);

  function handleSave(newCompany: ICompany): void {
    companyStore
      .update(newCompany)
      .then((updatedCompany) => {
        setCompany(updatedCompany);
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
