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
  ICartProductHandler,
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
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Avatar, Button, Col, FlexboxGrid, Stack } from "rsuite";
import { useStore } from "zustand";
import { Label, WebImage } from "./style";
import { ProductsByCategoryPageHandler } from "src/modules/customers/pages/Products/ProductsByCategoryPage";
import ImageViewer from "react-simple-image-viewer";

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
  const [imageIndex, setImageIndex] = useState<number>(-1);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    loadCompany();
  }, []);

  useEffect(() => {
    id && loadProduct(id as string);
  }, [id]);

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

  function getQuantityLabel(product: IProduct): string {
    if (product.unlimited) {
      return "Ilimitado";
    }

    if (product.quantity === 0) {
      return "Esgotado";
    }

    return GeneralUtils.getSulfixLabel(product.quantitySulfix, "");
  }

  const GeneralProperties = () => (
    <>
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
        title={getQuantityLabel(product)}
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
                endIcon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                onClick={() =>
                  navigate(
                    ProductsByCategoryPageHandler.navigate(category.value)
                  )
                }
              >
                {category.label}
              </Button>
            ))}
            {categories.length === 0 && (
              <div style={{ marginLeft: 5 }}>Sem categorias</div>
            )}
          </div>
        }
        colSize={12}
      />
    </>
  );

  function handleAddProduct() {
    cartStore.addProduct(company.id!, ICartProductHandler.empty(product), true);
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
          <Col xs={24} sm={24} md={24} lgHidden xlHidden xxlHidden>
            <Stack alignItems="center">
              <Avatar
                src={product.pictures?.[0]}
                size="lg"
                onClick={() => setImageIndex(0)}
              />
              <Stack.Item grow={1}>
                <Label>{product.label.toUpperCase()}</Label>
              </Stack.Item>
            </Stack>
            <GeneralProperties />
          </Col>
          <Col xsHidden smHidden mdHidden lg={24} xl={24} xxl={24}>
            <Stack alignItems="center">
              <WebImage
                picture={product.pictures?.[0]}
                onClick={() => setImageIndex(0)}
              />
              <Stack.Item grow={1}>
                <Property
                  label="Nome"
                  title={product.label.toUpperCase()}
                  colSize={24}
                />
                <GeneralProperties />
              </Stack.Item>
            </Stack>
          </Col>
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
        {product.unlimited || product.quantity > 0 ? (
          <PlusButton
            title="Adicionar produto"
            options={{ color: "primary" }}
            onClick={handleAddProduct}
          />
        ) : (
          <Button disabled appearance="default">
            Esgotado
          </Button>
        )}
      </PanelBase>
      {imageIndex !== -1 && (
        <ImageViewer
          src={product.pictures}
          currentIndex={imageIndex}
          closeOnClickOutside={true}
          backgroundStyle={{ backgroundColor: "rgba(0,0,0, 0.8)" }}
          onClose={() => setImageIndex(-1)}
        />
      )}
    </>
  );
}
