import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
  useProductStore,
} from "src/modules/customers/stores";
import {
  CategoriesUtils,
  GeneralUtils,
  ICompany,
  ICompanyHandler,
  IProduct,
  IProductHandler,
  PanelBase,
  PlusButton,
  Property,
  TitleBase,
  useToasterStore,
} from "src/modules/shared";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { Avatar, Button, FlexboxGrid, Stack } from "rsuite";
import { useStore } from "zustand";
import { Label } from "./style";

interface ProductDetailsProps {
  id: string;
}

export function ProductDetails(props: ProductDetailsProps) {
  const navigate = useNavigate();
  const { id } = props;
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const companyStore = useStore(useCompanyStore);
  const cartStore = useStore(useCartStore);
  const masterpageStore = useStore(useMasterpageStore);
  const [product, setProduct] = useState<IProduct>(IProductHandler.empty());
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const [processing, setProcessing] = useState<boolean>(false);

  function loadProduct(id: string) {
    setProcessing(true);

    productStore
      .get(id)
      .then(setProduct)
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));
  }

  function loadCompany(): void {
    setProcessing(true);

    companyStore
      .get()
      .then(setCompany)
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  useEffect(() => {
    loadCompany();
  }, []);

  useEffect(() => {
    id && loadProduct(id as string);
  }, [id]);

  function handleAddProduct() {
    cartStore.addProduct(company.id!, { quantity: 1, product });
    masterpageStore.setCart(true);
  }

  const categories = CategoriesUtils.getPlainCategories(company).filter(
    (category) => product.categories.includes(category.value)
  );

  return (
    <>
      <TitleBase title="Detalhes do produto" onBack={() => navigate(-1)} />
      <PanelBase title="Dados gerais">
        <FlexboxGrid justify="space-between" align="top">
          <Stack alignItems="center">
            <Avatar src={product.pictures?.[0]} size="lg" />
            <Stack.Item grow={1}>
              <Label>{product.label.toUpperCase()}</Label>
            </Stack.Item>
          </Stack>
          <Property
            label="Descrição"
            title={
              product.description && product.description.length > 0
                ? product.description
                : "N/I"
            }
            colSize={24}
          />
          <Property
            label="Estoque"
            title={
              product.unlimited
                ? "Ilimitado"
                : GeneralUtils.getSulfixLabel(
                    product.quantity,
                    product.quantitySulfix
                  )
            }
            colSize={12}
          />
          <Property
            label="Preço Unitário"
            title={GeneralUtils.getAmountLabel(product.price)}
            colSize={12}
          />
          <Property
            label="Categorias"
            title={
              <div style={{ marginLeft: -5 }}>
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    style={{ margin: 5 }}
                    appearance="subtle"
                    size="sm"
                    endIcon={
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    }
                    onClick={() =>
                      navigate(
                        `/customers/products/categories/${category.value}`
                      )
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            }
            colSize={12}
          />
        </FlexboxGrid>
      </PanelBase>
      <PanelBase title="Medidas e especificações">
        <FlexboxGrid justify="space-between" align="top">
          <Property
            label="Largura"
            title={product.width || "N/I"}
            colSize={12}
          />
          <Property
            label="Altura"
            title={product.height || "N/I"}
            colSize={12}
          />
          <Property
            label="Profundidade"
            title={product.length || "N/I"}
            colSize={12}
          />
          <Property label="Peso" title={product.weight || "N/I"} colSize={12} />
          {product.attributes.map((attribute, index) => (
            <Property
              key={index}
              label={attribute.label}
              title={attribute.value}
              colSize={12}
            />
          ))}
        </FlexboxGrid>
      </PanelBase>
      <PanelBase title="Ações">
        <PlusButton
          title="Adicionar produto"
          options={{ color: "primary" }}
          onClick={handleAddProduct}
        />
      </PanelBase>
    </>
  );
}
