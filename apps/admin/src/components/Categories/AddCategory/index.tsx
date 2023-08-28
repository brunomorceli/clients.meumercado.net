import { ReactNode, useState } from "react";
import { ICategory } from "@/interfaces";
import { useStore } from "zustand";
import { useCategoryStore } from "@/stores/category.store";
import { Button, Modal, message } from "antd";
import { ColorUtils } from "@/utils";
import { Backdrop } from "@/components";
import { CategoryForm } from "../CategoryForm";
import { ButtonContainer } from "./styles";
import { PlusOutlined } from "@ant-design/icons";

interface AddCategoryProps {
  buttonEl?: ReactNode | null | undefined;
  onSave?: () => void;
}

export function AddCategory(props: AddCategoryProps) {
  const categoryStore = useStore(useCategoryStore);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const { buttonEl } = props;

  function createEmptyCategory(): ICategory {
    return { label: "", color: ColorUtils.getRandomColor() };
  }

  function handleUpsert(category: ICategory): void {
    setProcessing(true);

    categoryStore
      .upsert(category)
      .then(() => {
        message.success(`Categoria criada com sucesso.`);
        setCategory(null);
        props.onSave && props.onSave();
      })
      .catch((e) => {
        message.error(e);
      })
      .finally(() => setProcessing(false));
  }

  return (
    <>
      {buttonEl ? (
        <ButtonContainer onClick={() => setCategory(createEmptyCategory())}>
          {buttonEl}
        </ButtonContainer>
      ) : (
        <Button onClick={() => setCategory(createEmptyCategory())}>
          <PlusOutlined />
        </Button>
      )}
      <Modal
        title="Criar categoria"
        open={Boolean(category)}
        footer={null}
        onCancel={() => setCategory(null)}
      >
        {!processing && (
          <CategoryForm category={category} onSubmit={handleUpsert} />
        )}
      </Modal>
      <Backdrop open={processing} />
    </>
  );
}
