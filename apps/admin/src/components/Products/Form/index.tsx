"use client";

import { IProduct, IProductHandler, IMeasure } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Categories,
  ImageCrop,
  ImageGalery,
  InputBase,
} from "@/components";
import { FlexboxGrid, Form, Schema, TagPicker, Toggle } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useProductStore } from "@/stores";
import {
  Button,
  List,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { CardCustom } from "./styles";
import {
  FormOutlined,
  PlusOutlined,
  SaveOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { EProductType } from "@/enums";
import { FormMeasures } from "./Measures";
import { MaskedInput } from "antd-mask-input";
import React from "react";
import { Currency } from "@/components/Shared/Inputs/Currency";
import { Attributes } from "./Attributes";
import { useRouter } from "next/router";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm(props: ProductFormProps) {
  const { productId } = props;
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const productStore = useStore(useProductStore);
  const categories = authStore.auth.company?.categories;
  const [processing, setProcessing] = useState<boolean>(false);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const editorRef = useRef<any>();
  const [product, setProduct] = useState<IProduct>({
    ...IProductHandler.empty(),
  });
  const productRef = useRef(product);
  const [toggleModalCategories, setToggleModalCategories] =
    useState<boolean>(false);
  const model = Schema.Model({
    label: Schema.Types.StringType().isRequired("Este campo é obrigatório."),
    price: Schema.Types.NumberType("Este campo deve ser um número.").addRule(
      (price) => !product.showPrice || Number(price) > 0,
      "Este campo é obrigatório"
    ),
    quantity: Schema.Types.NumberType("Este campo deve ser um número.").addRule(
      (quantity) => product.unlimited || Number(quantity) > 0,
      "Este campo é obrigatório"
    ),
    sku: Schema.Types.StringType().minLength(
      3,
      "O SKU deve conter pelo menos 3 letras"
    ),
    barcode: Schema.Types.StringType().minLength(
      3,
      "O Código de barras deve conter pelo menos 3 letras"
    ),
  });
  const loadProduct = useCallback(
    (id: string) => {
      setProcessing(true);

      productStore
        .get(id)
        .then(handleChangeProduct)
        .catch((e) => message.error(e))
        .finally(() => setProcessing(false));
    },
    [productStore]
  );

  useEffect(() => {
    productId && loadProduct(productId);
  }, [productId, loadProduct]);

  function handleChangeProductKey(key: string, val: any): void {
    productRef.current = { ...productRef.current, [key]: val };
    setProduct(productRef.current);
  }

  function handleChangeProduct(data: any): void {
    productRef.current = data;
    setProduct(productRef.current);
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
    if (!img) {
      return;
    }

    productRef.current = {
      ...productRef.current,
      pictures: [...productRef.current.pictures, img],
    };

    setProduct(productRef.current);
  }

  function handleChangeMeasure(measure: IMeasure): void {
    const measures = [...productRef.current.measures];
    const index = measures.findIndex((m) => m.id === measure.id);
    measures[index] = measure;

    handleChangeProduct({ ...productRef.current, measures });
  }

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    setProcessing(true);

    productStore
      .upsert(productRef.current)
      .then((prod) => {
        message.success("Produto salvo com sucesso.");
        router.replace(`/products/${prod.id}`);
      })
      .catch((e) => message.error(e))
      .finally(() => setProcessing(false));
  }

  const flatCategories = getFlatCategories(categories);
  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={productRef.current}
      formError={formError}
      onChange={handleChangeProduct}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <Typography.Title level={2}>
        <TagsOutlined />
        &nbsp; Formulário de produto
      </Typography.Title>
      <CardCustom title="Informações gerais">
        <InputBase name="label" label="Nome" />
        <Form.Group>
          <Form.ControlLabel>
            Descrição ({(productRef.current.description || "").length}/{2048})
          </Form.ControlLabel>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={productRef.current.description}
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
              handleChangeProductKey("description", e.level.content || "")
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
            <Button icon={<PlusOutlined />}>Adicionar Imagem</Button>
          </ImageCrop>,
        ]}
      >
        {productRef.current.pictures.length === 0 ? (
          <Typography>Nenhuma imagem adicionada.</Typography>
        ) : (
          <ImageGalery
            images={productRef.current.pictures}
            onChange={(p) => handleChangeProductKey("pictures", p)}
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
                checked={productRef.current.showPrice}
                onChange={(checked) =>
                  handleChangeProductKey("showPrice", checked)
                }
              />,
            ]}
          >
            <Typography.Text
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeProductKey(
                  "showPrice",
                  !productRef.current.showPrice
                )
              }
            >
              Mostrar o preço
            </Typography.Text>
          </List.Item>
        </List>
        {productRef.current.showPrice && (
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={11}>
              <Form.Group style={{ width: "100%" }}>
                <Form.ControlLabel>Preço</Form.ControlLabel>
                <Currency
                  cents={productRef.current.price}
                  placeholder="R$ 100,00"
                  onChange={(c) => handleChangeProductKey("price", c)}
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
                  cents={productRef.current.discountPrice!}
                  placeholder="R$ 89,99"
                  onChange={(c) => handleChangeProductKey("discountPrice", c)}
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
          defaultValue={productRef.current.type}
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
                checked={!productRef.current.unlimited}
                onChange={(checked) =>
                  handleChangeProductKey("unlimited", !checked)
                }
              />,
            ]}
          >
            <Typography.Text
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeProductKey(
                  "unlimited",
                  !productRef.current.unlimited
                )
              }
            >
              Limite
            </Typography.Text>
          </List.Item>
          {!productRef.current.unlimited && (
            <List.Item>
              <Form.Group style={{ width: "100%" }}>
                <Form.ControlLabel>Quantidade</Form.ControlLabel>
                <MaskedInput
                  value={`${productRef.current.quantity || ""}`}
                  mask={/^[0-9]+$/}
                  onChange={(e) =>
                    handleChangeProductKey("quantity", Number(e.target.value))
                  }
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
        <FormMeasures
          measures={product.measures}
          onChange={(m) => handleChangeMeasure(m)}
        />
      </CardCustom>
      <CardCustom title="Categorias">
        <TagPicker
          size="lg"
          defaultValue={productRef.current.categories}
          value={productRef.current.categories}
          placeholder="Selecione as categorias"
          data={flatCategories}
          style={{ width: "100% " }}
          onChange={(selected) =>
            handleChangeProductKey("categories", selected)
          }
        />
        <Button
          type="link"
          icon={<FormOutlined />}
          onClick={() => setToggleModalCategories(!toggleModalCategories)}
        >
          Gerenciar categorias
        </Button>
        <Modal
          closeIcon={null}
          open={toggleModalCategories}
          onCancel={() => setToggleModalCategories(!toggleModalCategories)}
          okText="Concluir"
          onOk={() => setToggleModalCategories(!toggleModalCategories)}
        >
          <Categories />
        </Modal>
      </CardCustom>
      <Attributes
        attributes={product.attributes}
        onChange={(attributes) =>
          handleChangeProductKey("attributes", attributes)
        }
      />
      <Row justify={"end"}>
        <Button type="primary" onClick={handleSubmit} icon={<SaveOutlined />}>
          Salvar
        </Button>
      </Row>
    </Form>
  );
}
