import { useCallback, useEffect, useState } from "react";
import { ICategory } from "@/interfaces";
import { useStore } from "zustand";
import { useCategoryStore } from "@/stores/category.store";
import { Button, Card, Modal, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColorUtils } from "@/utils";
import { Spin } from "@/components";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./List";

export function Categories() {
  const categoryStore = useStore(useCategoryStore);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryForm, setCategoryForm] = useState<ICategory | null>(null);
  const [processing, setProcessing] = useState<boolean>(true);
  const loadCategories = useCallback((): void => {
    setProcessing(true);

    categoryStore
      .list()
      .then(setCategories)
      .catch((e) => message.error(e))
      .finally(() => setProcessing(false));    
  }, [categoryStore]);

  useEffect(() => { loadCategories(); }, [loadCategories]);

  function createEmptyCategory(): ICategory {
    return { label: '', color: ColorUtils.getRandomColor() };
  }


  function handleUpsert(category: ICategory): void {
    setProcessing(true);

    categoryStore
      .upsert(category)
      .then(() => {
        message.success(`Categoria ${category.id ? 'salva' : 'criada'} com sucesso.`);
        setCategoryForm(null);
        loadCategories();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false);
      });
  }

  function handleRemove(category: ICategory): void {
    setProcessing(true);

    categoryStore
      .remove(category.id!)
      .then(() => {
        message.success('Categoria removida com sucesso.');
        loadCategories();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false)
      });
  }

  const modalPrefix = (categoryForm || {}).id ? 'Editar' : 'Criar';

  if (processing) {
    return <Spin />;
  }

  return (
    <Card>
      <Typography.Title level={4}>
          Categorias ({categories.length})
          &nbsp;
          <Button onClick={() => setCategoryForm(createEmptyCategory())}>
            <PlusOutlined />
          </Button>
        </Typography.Title>
      <CategoryList
        categories={categories}
        onEdit={setCategoryForm}
        onRemove={handleRemove}
      />
      {categories.length === 0 &&
        <Typography.Title level={4}>
          Nenhuma categoria cadastrada.
        </Typography.Title>
      }
      <Modal
        title={`${modalPrefix} categoria`}
        open={Boolean(categoryForm)}
        footer={null}
        onCancel={() => setCategoryForm(null)}
      >
        <CategoryForm category={categoryForm} onSubmit={handleUpsert} />
      </Modal>
    </Card>
  );
}
