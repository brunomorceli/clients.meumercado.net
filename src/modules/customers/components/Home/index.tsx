import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "zustand";
import { Carousel } from "rsuite";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ProductCard } from "src/modules/customers/components";
import { ProductDetailsPageHandler } from "src/modules/customers/pages/Products/ProductDetailsPage";
import {
  ICartProductHandler,
  ICompany,
  ICompanyHandler,
  IProduct,
  useToasterStore,
} from "src/modules/shared";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
  useProductStore,
} from "src/modules/customers/stores";

const carouselImgStyle = {
  width: "100%",
  paddingTop: "-100%",
  backgroundImage: 'url("images/carousel/1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const titleStyle = {
  color: "var(--header-text-color)",
  fontSize: 20,
  marginTop: 20,
  marginBottom: 20,
  padding: 10,
  borderRadius: 5,
  backgroundColor: "var(--primary-color)",
};

export function CustomerHome() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const compayStore = useStore(useCompanyStore);
  const cartStore = useStore(useCartStore);
  const masterpageStore = useStore(useMasterpageStore);
  const toasterStore = useStore(useToasterStore);
  const productStore = useStore(useProductStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const [products, setProducts] = useState<IProduct[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<IProduct[]>([]);
  const { companyId } = authStore;

  useEffect(() => {
    compayStore.get().then(setCompany).catch(toasterStore.error);
    productStore.find({ random: true }).then((res) => setProducts(res.data));
    productStore.find({ random: true, onSale: true }).then((res) => setOnSaleProducts(res.data));
  }, []);

  function handleAddProduct(product: IProduct): void {
    cartStore.addProduct(companyId, ICartProductHandler.empty(product), true);
    masterpageStore.setCart(true);
  }

  return (
    <>
      {(company.covers || []).length > 0 && (
        <Carousel
          autoplay
          shape="bar"
          style={{ width: "100%", borderRadius: 5 }}
        >
          {(company.covers || []).map((cover, index) => (
            <div
              key={index}
              style={{
                ...carouselImgStyle,
                backgroundImage: `url("${cover}")`,
              }}
            />
          ))}
        </Carousel>
      )}

      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Promoções da semana
      </div>

      <ProductCard
        products={onSaleProducts}
        onAdd={handleAddProduct}
        onDetails={(p) =>
          navigate(ProductDetailsPageHandler.navigate(p.id!.toString()))
        }
      />

      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Produtos
      </div>

      <ProductCard
        products={products}
        onAdd={handleAddProduct}
        onDetails={(p) =>
          navigate(ProductDetailsPageHandler.navigate(p.id!.toString()))
        }
      />
    </>
  );
}
