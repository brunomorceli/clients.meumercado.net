import { useStore } from "zustand";
import { useToasterStore } from "@shared/stores";
import { useAuthStore, useCompanyStore } from "@admins/stores";
import { CategoryForm, CustomItemDataType } from "./Form";
import { useCallback, useEffect, useState } from "react";
import { ICompany, ICompanyHandler } from "@shared/interfaces";

interface CategoriesProps {
  onChange?: (company: ICompany) => void;
}

export function Categories(props: CategoriesProps) {
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const toasterStore = useStore(useToasterStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const loadCompany = useCallback((companyId: string) => {
    companyStore
      .get(companyId)
      .then(setCompany)
      .catch(toasterStore.error);
  },[companyStore]);

  useEffect(() => {
    loadCompany(authStore.companyId);
  }, [loadCompany, authStore.companyId]);

  function updateCategories(categories: CustomItemDataType[]): void {
    companyStore
      .update({ id: company.id, categories: categories })
      .then((updatedCompany) => {
        setCompany(updatedCompany);
        props.onChange && props.onChange(updatedCompany);
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
    <CategoryForm
      categories={company.categories}
      onChange={updateCategories}
    />
  );
}
