"use client";

import { IProduct, IProductHandler } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageCrop, ImageGalery } from "@/components";
import { Form, Schema, SelectPicker, Toggle } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useProductStore } from "@/stores";
import { Button, Checkbox, List, Switch, Typography, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { CardCustom } from "./styles";
import { PlusOutlined } from "@ant-design/icons";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Por favor, informe um e-mail válido.")
    .isRequired("Este campo é obrigatório."),
});

function TextField(props: any) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

interface ProductFormProps {
  productId?: string;
}

export function ProductForm(props: ProductFormProps) {
  const { productId } = props;
  const authStore = useStore(useAuthStore);
  const productStore = useStore(useProductStore);
  const categories = authStore.auth.company?.categories;
  const [processing, setProcessing] = useState<boolean>(false);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const editorRef = useRef<any>();
  const [product, setProduct] = useState<IProduct>({
    ...IProductHandler.getEmptyProduct(),
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9TuKjHOpcBr46KJ5TzNU7xWO7spVW2Gypw&usqp=CAU",
      "https://brqualityconsultoria.com.br/wp-content/uploads/2021/12/Untitled-design.png",
      "https://www.comprerural.com/wp-content/uploads/2017/12/carne-bovina-41.jpg",
      "https://bhdicas.uai.com.br/wp-content/uploads/sites/23/2017/03/carne-bh-1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9TuKjHOpcBr46KJ5TzNU7xWO7spVW2Gypw&usqp=CAU",
    ],
  });
  const loadProduct = useCallback(
    (id: string) => {
      setProcessing(true);

      productStore
        .get(id)
        .then(setProduct)
        .catch((e) => message.error(e))
        .finally(() => setProcessing(false));
    },
    [productStore]
  );

  useEffect(() => {
    productId && loadProduct(productId);
  }, [productId, loadProduct]);

  function handleChangeProduct(key: string, val: any): void {
    setProduct({ ...product, [key]: val });
  }

  function handleAddPicture(img?: string | null | undefined): void {
    img && setProduct({ ...product, pictures: [...product.pictures, img] });
  }

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    setProcessing(true);

    productStore
      .upsert(product)
      .then(() => loadProduct(product.id!))
      .catch((e) => message.error(e))
      .finally(() => setProcessing(false));
  }

  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={product}
      formError={formError}
      onChange={(p) => setProduct(p as any)}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <Typography.Title level={2}>
        {productId ? "Editar" : "Criar"} produto
      </Typography.Title>
      <CardCustom title="Informações gerais">
        <TextField name="label" label="Nome" />
        <Form.Group>
          <Form.ControlLabel>
            Descrição ({(product.description || "").length}/{2048})
          </Form.ControlLabel>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={product.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              max_height: 2024,
            }}
            onChange={(e: any) =>
              handleChangeProduct("description", e.level.content || "")
            }
          />
        </Form.Group>
      </CardCustom>
      <CardCustom
        title="Imagens"
        extra={[
          <ImageCrop
            key="addBtn"
            onChange={(img) => handleAddPicture(img)}
            aspect="dynamic"
          >
            <Button>
              Adicionar Imagem <PlusOutlined />
            </Button>
          </ImageCrop>,
        ]}
      >
        <ImageGalery
          images={product.pictures}
          onChange={(p) => handleChangeProduct("pictures", p)}
        />
      </CardCustom>
      <CardCustom title="Preços">
        <List>
          <List.Item
            actions={[
              <Toggle
                size="lg"
                checkedChildren="Mostrar"
                unCheckedChildren="Não Mostrar"
                key="togglePrice"
                checked={product.showPrice}
                onChange={(checked) =>
                  handleChangeProduct("showPrice", checked)
                }
              />,
            ]}
          >
            Mostrar o preço
          </List.Item>
          {product.showPrice && (
            <List.Item>
              <TextField name="price" label="Preço" />
              <TextField name="discountPrice" label="Preço de desconto" />
            </List.Item>
          )}
        </List>
      </CardCustom>
      <CardCustom title="Tipo de produto">
        <List>
          <List.Item
            actions={[
              <Toggle
                size="lg"
                checkedChildren="Mostrar"
                unCheckedChildren="Não Mostrar"
                key="togglePrice"
                checked={product.}
                onChange={(checked) =>
                  handleChangeProduct("showPrice", checked)
                }
              />,
            ]}
          ></List.Item>
        </List>
      </CardCustom>
      <CardCustom title="Estoque"></CardCustom>
      <CardCustom title="Identificação"></CardCustom>
      <CardCustom title="Métrica do produto"></CardCustom>
      <CardCustom title="Categorias"></CardCustom>
      <CardCustom title="Outras opções"></CardCustom>
    </Form>
  );
}
