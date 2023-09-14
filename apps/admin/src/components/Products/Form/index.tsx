"use client";

import { IProduct, IProductHandler } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageCrop, ImageGalery, InputBase } from "@/components";
import { FlexboxGrid, Form, Schema, TagPicker, Toggle } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useProductStore } from "@/stores";
import { Button, List, Select, Typography, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { CardCustom } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { EProductType } from "@/enums";
import { Measures } from "./Measures";
import { MaskedInput } from "antd-mask-input";
import React from "react";
import { Currency } from "@/components/Shared/Inputs/Currency";

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
    ...IProductHandler.empty(),
    pictures: [],
  });
  const model = Schema.Model({
    label:  Schema.Types.StringType()
      .isRequired("Este campo é obrigatório."),
    price:  Schema.Types.NumberType('Este campo deve ser um número.')
      .addRule((price) => !product.showPrice || Number(price) > 0, 'Este campo é obrigatório'),
    quantity: Schema.Types.NumberType('Este campo deve ser um número.')
      .addRule((quantity) => product.unlimited || Number(quantity) > 0, 'Este campo é obrigatório'),
    sku: Schema.Types.StringType()
      .minLength(3, 'O SKU deve conter pelo menos 3 letras'),
    barcode: Schema.Types.StringType()
      .minLength(3, 'O Código de barras deve conter pelo menos 3 letras'),
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

  function getFlatCategories(item: any, dst?: any[]) {
    const result = dst || [];
    let list = [];

    if (!Array.isArray(item)) {
      result.push({ label: item.label, value: item.value });
      if (item.children) {
        list = item.children;
      }
    } else {
      list = item;
    }

    for (let i = 0; i < list.length; i++) {
      getFlatCategories(list[i], result);
    }

    return result;
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

  const flatCategories = getFlatCategories(categories);

  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={product}
      formError={formError}
      onChange={(p) => { setProduct(p as any); }}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <Typography.Title level={2}>
        {productId ? "Editar" : "Criar"} produto
      </Typography.Title>
      <CardCustom title="Informações gerais">
        <InputBase name="label" label="Nome" />
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
        {product.pictures.length === 0 ? (
          <Typography>Nenhuma imagem adicionada.</Typography>
        ) : (
          <ImageGalery
            images={product.pictures}
            onChange={(p) => handleChangeProduct("pictures", p)}
          />
        )}
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
            <Typography.Text
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeProduct("showPrice", !product.showPrice)
              }
            >
              Mostrar o preço
            </Typography.Text>
          </List.Item>
        </List>
        {product.showPrice && (
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={11}>
              <Form.Group style={{ width: "100%" }}>
                <Form.ControlLabel>Preço</Form.ControlLabel>
                <Currency
                  cents={product.price}
                  placeholder="R$ 100,00"
                  onChange={(c) => handleChangeProduct("price", c)}
                />
                <Form.ErrorMessage show={formError.price}>
                  {formError.price}
                </Form.ErrorMessage>
              </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
              <Form.Group style={{ width: "100%" }}>
                <Form.ControlLabel>Preço de desconto</Form.ControlLabel>
                <Currency
                  cents={product.discountPrice!}
                  placeholder="R$ 89,99"
                  onChange={(c) => handleChangeProduct("discountPrice", c)}
                />
                <Form.ErrorMessage show={formError.discountPrice}>
                  {formError.price}
                </Form.ErrorMessage>
              </Form.Group>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        )}
      </CardCustom>
      <CardCustom title="Tipo de produto">
        <Select
          style={{ width: "100%" }}
          options={[
            { label: "Físico", value: EProductType.PHYSIC },
            { label: "Digital ou serviço", value: EProductType.DIGITAL },
          ]}
          defaultValue={product.type}
        />
      </CardCustom>
      <CardCustom title="Estoque">
        <List>
          <List.Item
            actions={[
              <Toggle
                size="lg"
                checkedChildren="Limitado"
                unCheckedChildren="Ilimitado"
                key="toggleUnlimited"
                checked={!product.unlimited}
                onChange={(checked) =>
                  handleChangeProduct("unlimited", !checked)
                }
              />,
            ]}
          >
            <Typography.Text
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeProduct("unlimited", !product.unlimited)
              }
            >
              Limite
            </Typography.Text>
          </List.Item>
          {!product.unlimited && (
            <List.Item>
              <Form.Group style={{ width: "100%" }}>
                <Form.ControlLabel>Quantidade</Form.ControlLabel>
                <MaskedInput
                  value={`${product.quantity || ''}`}
                  mask={/^[0-9]+$/}
                  onChange={(e) => handleChangeProduct("quantity", Number(e.target.value))}
                />
                <Form.ErrorMessage show={formError.quantity}>
                  {formError.quantity}
                </Form.ErrorMessage>
              </Form.Group>
            </List.Item>
          )}
        </List>
      </CardCustom>
      <CardCustom title="Identificação">
        <List>
          <List.Item>
            <InputBase name="barcode" label="Código de barras" />
          </List.Item>
          <List.Item>
            <InputBase name="sku" label="SKU" />
          </List.Item>
        </List>
      </CardCustom>
      <CardCustom title="Medidas do produto">
        <Measures
          measures={product.measures}
          onChange={(m) => handleChangeProduct("measures", m)}
        />
      </CardCustom>
      <CardCustom title="Categorias">
        <TagPicker
          size="lg"
          defaultValue={product.categories}
          placeholder="Selecione as categorias"
          data={flatCategories}
          style={{ width: "100% " }}
          onChange={(selected) => handleChangeProduct("categories", selected)}
        />
      </CardCustom>
      <CardCustom title="Outras opções"></CardCustom>
      <Button color="primary" onClick={handleSubmit}>Salvar</Button>
    </Form>
  );
}
