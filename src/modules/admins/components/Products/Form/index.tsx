"use client";

import {
  IProduct,
  IProductHandler,
  ICompany,
  ICompanyHandler,
} from "@shared/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImageGalery,
  InputBase,
  InputNumber,
  PanelBase,
  SaveButton,
  TitleBase,
} from "@shared/components";

import {
  Button,
  Col,
  FlexboxGrid,
  Form,
  Schema,
  SelectPicker,
  Stack,
  TagPicker,
  Toggle,
} from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useToasterStore } from "@shared/stores";
import { useCompanyStore, useProductStore } from "@admins/stores";
import { EProductType } from "@shared/enums";
import React from "react";
import { Attributes } from "./Attributes";
import { useRouter } from "next/router";
import { FormOutlined } from "@ant-design/icons";
import { FormModal, Currency } from "@shared/components";
import { Categories } from "../..";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm(props: ProductFormProps) {
  const { productId } = props;
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const productStore = useStore(useProductStore);
  const companyStore = useStore(useCompanyStore);
  const toasterStore = useStore(useToasterStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const [processing, setProcessing] = useState<boolean>(false);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [product, setProduct] = useState<IProduct>({
    ...IProductHandler.empty(),
  });
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
  const loadCompany = useCallback(
    (companyId: string) => {
      setProcessing(true);

      companyStore
        .get(companyId)
        .then(setCompany)
        .catch((e) => toasterStore.error(e))
        .finally(() => setProcessing(false));
    },
    [companyStore]
  );

  const loadProduct = useCallback(
    (id: string) => {
      setProcessing(true);

      productStore
        .get(id)
        .then(handleChangeProduct)
        .catch((e) => toasterStore.error(e))
        .finally(() => setProcessing(false));
    },
    [productStore]
  );

  useEffect(() => {
    loadCompany(authStore.companyId);
  }, [loadCompany, authStore.companyId]);

  useEffect(() => {
    productId && loadProduct(productId);
  }, [productId, loadProduct]);

  function handleChangeProductKey(key: string, val: any): void {
    setProduct({ ...product, [key]: val });
  }

  function handleChangeProduct(data: any): void {
    setProduct(data);
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

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    setProcessing(true);

    productStore
      .upsert(product)
      .then(() => {
        toasterStore.success("Produto salvo com sucesso.");
        router.replace("/admins/products");
      })
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));
  }

  const flatCategories = getFlatCategories(company.categories);
  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={product}
      formError={formError}
      onChange={handleChangeProduct}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <TitleBase
        title="Formulário de produto"
        onBack={() => router.replace("/admins/products")}
      />
      <PanelBase title="Informações gerais">
        <InputBase
          label="Nome (obrigatório)"
          value={product.label}
          error={formError.label}
          onChange={(val) => handleChangeProductKey("label", val)}
        />
        <InputBase
          label={`Descrição (${product.description?.length}/${2024})`}
          value={product.description || ""}
          error={formError.description}
          options={{ as: "textarea", rows: 5 }}
          onChange={(value) =>
            handleChangeProductKey("description", value.substring(0, 2024))
          }
        />
      </PanelBase>
      <PanelBase title="Imagens">
        <ImageGalery
          images={product.pictures}
          onChange={(p) => handleChangeProductKey("pictures", p)}
        />
      </PanelBase>
      <PanelBase title="Preços">
        <Stack
          justifyContent="space-between"
          onClick={() =>
            handleChangeProductKey("showPrice", !product.showPrice)
          }
          style={{ cursor: "pointer" }}
        >
          <h6>Mostrar preço:</h6>
          <Toggle
            size="lg"
            checkedChildren="Mostrar"
            unCheckedChildren="Não Mostrar"
            key="togglePrice"
            checked={product.showPrice}
            onChange={() =>
              handleChangeProductKey("showPrice", !product.showPrice)
            }
          />
        </Stack>
        {product.showPrice && (
          <FlexboxGrid justify="space-between">
            <Col xs={24} sm={24} md={12} lg={12} xl={11}>
              <Currency
                label="Preço (obrigatório)"
                cents={product.price}
                placeholder="R$ 100,00"
                error={formError.price}
                onChange={(c) => handleChangeProductKey("price", c)}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={11}>
              <Currency
                label="Preço de desconto"
                cents={product.discountPrice!}
                placeholder="R$ 89,99"
                error={formError.discountPrice}
                onChange={(c) => handleChangeProductKey("discountPrice", c)}
              />
            </Col>
          </FlexboxGrid>
        )}
      </PanelBase>
      <PanelBase title="Tipo de produto">
        <SelectPicker
          searchable={false}
          cleanable={false}
          style={{ width: "100%" }}
          data={[
            { label: "Físico", value: EProductType.PHYSIC },
            { label: "Digital ou serviço", value: EProductType.DIGITAL },
          ]}
          value={product.type}
          defaultValue={product.type}
          onChange={(value) => handleChangeProductKey("type", value)}
        />
      </PanelBase>
      <PanelBase title="Estoque">
        <Stack
          justifyContent="space-between"
          onClick={() =>
            handleChangeProductKey("unlimited", !product.unlimited)
          }
          style={{ cursor: "pointer" }}
        >
          <h6>Limite:</h6>
          <Toggle
            size="lg"
            checkedChildren="Limitado"
            unCheckedChildren="Ilimitado"
            key="toggleUnlimited"
            checked={!product.unlimited}
            onChange={(checked) => handleChangeProductKey("unlimited", checked)}
          />
        </Stack>
        {!product.unlimited && (
          <InputNumber
            label="Quantidade (obrigatório)"
            value={product.quantity || ""}
            error={formError.quantity}
            onChange={(value) => handleChangeProductKey("quantity", value)}
          />
        )}
      </PanelBase>
      <PanelBase title="Identificação">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={12} lg={12} xl={11}>
            <InputBase
              label="Código de barras"
              value={product.barcode}
              error={formError.barcode}
              onChange={(val) => handleChangeProductKey("barcode", val)}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={11}>
            <InputBase
              label="SKU"
              value={product.sku}
              error={formError.sku}
              onChange={(val) => handleChangeProductKey("sku", val)}
            />
          </Col>
        </FlexboxGrid>
      </PanelBase>
      <PanelBase title="Medidas do produto">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputBase
              label="Largura"
              value={product.width}
              onChange={(val) => handleChangeProductKey("width", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputBase
              label="Altura"
              value={product.height}
              onChange={(val) => handleChangeProductKey("height", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputBase
              label="Comprimento"
              value={product.length}
              onChange={(val) => handleChangeProductKey("length", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputBase
              label="Peso"
              value={product.weight}
              onChange={(val) => handleChangeProductKey("weight", val || "")}
            />
          </Col>
        </FlexboxGrid>
      </PanelBase>
      <PanelBase title="Categorias">
        <TagPicker
          size="lg"
          defaultValue={product.categories}
          value={product.categories}
          placeholder="Selecione as categorias"
          data={flatCategories}
          style={{ width: "100% " }}
          onChange={(selected) =>
            handleChangeProductKey("categories", selected)
          }
        />
        <Button
          appearance="link"
          startIcon={<FormOutlined />}
          onClick={() => setToggleModalCategories(!toggleModalCategories)}
        >
          Gerenciar categorias
        </Button>
        <FormModal
          open={toggleModalCategories}
          onClose={() => setToggleModalCategories(!toggleModalCategories)}
          onSave={() => setToggleModalCategories(!toggleModalCategories)}
          saveText="Concluir"
        >
          <Categories onChange={setCompany} />
        </FormModal>
      </PanelBase>
      <Attributes
        attributes={product.attributes}
        onChange={(attributes) =>
          handleChangeProductKey("attributes", attributes)
        }
      />
      <FlexboxGrid justify="end">
        <SaveButton onClick={handleSubmit} />
      </FlexboxGrid>
    </Form>
  );
}