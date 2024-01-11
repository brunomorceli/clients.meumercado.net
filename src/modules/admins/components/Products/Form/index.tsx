import { useEffect, useRef, useState } from "react";
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
import { useNavigate, useLocation } from "react-router";
import { FormOutlined } from "@ant-design/icons";

import { useToasterStore } from "src/modules/shared/stores";
import { EProductType } from "src/modules/shared/enums";
import { Attributes } from "./Attributes";
import { FormModal, InputCurrency } from "src/modules/shared/components";
import { Categories } from "src/modules/admins/components";
import { ProductsHandler } from "src/modules/admins/pages/Products/ProductsPage";
import {
  useAuthStore,
  useCompanyStore,
  useProductStore,
} from "src/modules/admins/stores";
import {
  ImageGalery,
  InputText,
  InputNumber,
  PanelBase,
  SaveButton,
  TitleBase,
} from "src/modules/shared/components";
import {
  IProduct,
  IProductHandler,
  ICompany,
  ICompanyHandler,
} from "src/modules/shared/interfaces";
import { ProductWizzardForm } from "./Wizzard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm(props: ProductFormProps) {
  const { productId } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = useStore(useAuthStore);
  const productStore = useStore(useProductStore);
  const companyStore = useStore(useCompanyStore);
  const toasterStore = useStore(useToasterStore);
  const [showWizzard, setShowWizzard] = useState<boolean>(false);
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
    discountPrice: Schema.Types.NumberType(
      "Este campo deve ser um número."
    ).addRule(() => {
      if (!product.showPrice || Number.isNaN(product.discountPrice)) {
        return true;
      }

      if (Number(product.discountPrice) >= Number(product.price)) {
        return false;
      }

      return true;
    }, "O valor do preço de desconto deve ser menor que o do preço."),
    sku: Schema.Types.StringType().minLength(
      3,
      "O SKU deve conter pelo menos 3 letras"
    ),
    barcode: Schema.Types.StringType().minLength(
      3,
      "O Código de barras deve conter pelo menos 3 letras"
    ),
  });

  useEffect(() => {
    location.pathname &&
      location.pathname.indexOf("/create") >= 0 &&
      setShowWizzard(true);
  }, [location.pathname]);

  useEffect(() => {
    authStore.companyId && loadCompany(authStore.companyId);
  }, [authStore.companyId]);

  useEffect(() => {
    productId && !processing && loadProduct(productId);
  }, [productId]);

  function handleChangeProductKey(key: string, val: any): void {
    setProduct({ ...product, [key]: val });
  }

  function loadCompany(companyId: string) {
    setProcessing(true);

    companyStore
      .get(companyId)
      .then(setCompany)
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));
  }

  function loadProduct(id: string) {
    setProcessing(true);

    productStore
      .get(id)
      .then(setProduct)
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));
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
      toasterStore.error("Por favor, verifique os erros antes de prosseguir.");
      return;
    }

    setFormError({});

    setProcessing(true);

    productStore
      .upsert(product)
      .then(() => {
        toasterStore.success("Produto salvo com sucesso.");
        navigate(ProductsHandler.navigate());
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
      onChange={(data) => setProduct(data as any)}
      onError={setFormError}
    >
      <TitleBase
        title={`${productId ? "Editar" : "Novo"} produto`}
        onBack={() => navigate(ProductsHandler.navigate())}
      />
      <PanelBase
        title="Informações gerais"
        actionEl={
          !product.id && (
            <Button
              startIcon={<FontAwesomeIcon icon={faWandMagicSparkles} />}
              onClick={() => setShowWizzard(true)}
            >
              Abrir assistente
            </Button>
          )
        }
      >
        <InputText
          label="Nome (obrigatório)"
          value={product.label}
          error={formError.label}
          onChange={(val) => handleChangeProductKey("label", val)}
        />
        <InputText
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
              <InputCurrency
                label="Preço (obrigatório)"
                cents={product.price}
                placeholder="ex: R$ 100,00"
                error={formError.price}
                onChange={(c) => handleChangeProductKey("price", c)}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={11}>
              <InputCurrency
                label="Preço de desconto"
                cents={product.discountPrice!}
                placeholder="ex: R$ 89,99"
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
          <FlexboxGrid justify="space-between">
            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
              <InputNumber
                label="Quantidade"
                value={product.quantity || ""}
                error={formError.quantity}
                onChange={(value) => handleChangeProductKey("quantity", value)}
              />
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <InputText
                label="Unidade"
                value={product.quantitySulfix}
                options={{ placeholder: "Ex: G, CM, KG" }}
                onChange={(value) =>
                  handleChangeProductKey("quantitySulfix", value)
                }
              />
            </Col>
          </FlexboxGrid>
        )}
      </PanelBase>
      <PanelBase title="Identificação">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={12} lg={12} xl={11}>
            <InputText
              label="Código de barras"
              value={product.barcode}
              error={formError.barcode}
              onChange={(val) => handleChangeProductKey("barcode", val)}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={11}>
            <InputText
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
            <InputText
              label="Largura"
              value={product.width}
              onChange={(val) => handleChangeProductKey("width", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputText
              label="Altura"
              value={product.height}
              onChange={(val) => handleChangeProductKey("height", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputText
              label="Comprimento"
              value={product.length}
              onChange={(val) => handleChangeProductKey("length", val || "")}
            />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <InputText
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
      <ProductWizzardForm
        open={showWizzard}
        onPick={setProduct}
        onClose={() => setShowWizzard(false)}
      />
    </Form>
  );
}
