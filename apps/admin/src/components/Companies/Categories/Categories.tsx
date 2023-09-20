import { message } from "antd";
import { useStore } from "zustand";
import { useAuthStore, useCompanyStore } from "@/stores";
import { CategoryForm, CustomItemDataType } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { ICompany, ICompanyHandler } from "@/interfaces";

interface CategoriesProps {
  onChange?: (company: ICompany) => void;
}

export function Categories(props: CategoriesProps) {
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const loadCompany = useCallback((companyId: string) => {
    companyStore
      .get(companyId)
      .then(setCompany)
      .catch(message.error);
  },[companyStore]);

  useEffect(() => {
    loadCompany(authStore.auth.company.id);
  }, [loadCompany, authStore.auth.company.id]);

  function updateCategories(categories: CustomItemDataType[]): void {
    companyStore
      .update({ id: company.id, categories: categories })
      .then((updatedCompany) => {
        setCompany(updatedCompany);
        props.onChange && props.onChange(updatedCompany);
      })
      .catch((e) => message.error(e));
  }

  return (
    <CategoryForm
      categories={company.categories}
      onChange={updateCategories}
    />
  );
}
