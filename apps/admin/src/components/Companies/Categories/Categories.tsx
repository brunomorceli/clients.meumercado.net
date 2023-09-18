import { message } from "antd";
import { useStore } from "zustand";
import { useAuthStore, useCompanyStore } from "@/stores";
import { CategoryForm, CustomItemDataType } from "@/components";

export function Categories() {
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const categories = authStore.auth.company?.categories as CustomItemDataType[];

  function updateCategories(categories: CustomItemDataType[]): void {
    const company = authStore.auth.company;

    companyStore
      .upsert({ id: company?.id, categories: categories })
      .then(authStore.setCompany)
      .catch((e) => message.error(e));
  }

  return (
    <CategoryForm
      categories={categories}
      onChange={updateCategories}
    />
  );
}
