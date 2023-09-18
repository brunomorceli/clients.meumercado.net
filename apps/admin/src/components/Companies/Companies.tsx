import { useStore } from "zustand";
import { CompanyForm } from ".";
import { useAuthStore } from "@/stores";
import { useEffect, useState } from "react";
import { ICompany } from "@/interfaces";
import { TitleBase } from "..";
import { useRouter } from "next/router";

export function Companies () {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const [company, setCompany] = useState<ICompany>(authStore.auth.company!);

  useEffect(() => {
    setCompany(authStore.auth.company!);
  }, [authStore.auth.company]);

  function handleSave(newCompany: ICompany): void {
    console.log('save:', newCompany);
  }

  return (
    <>
      <TitleBase title="Minha empresa" onBack={() => router.replace('/')} />
      <CompanyForm company={company} onSave={handleSave}  />
    </>
  );
}