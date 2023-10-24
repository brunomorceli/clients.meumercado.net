import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductCard } from "@root/modules/customers/components";
import { useAuthStore, useCartStore, useMasterpageStore, useProductStore } from "@root/modules/customers/stores";
import { ICartProductHandler, IProduct } from "@root/modules/shared";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "rsuite";
import { useStore } from "zustand";

const carouselImgStyle = {
  width: "100%",
  paddingTop: "-100%",
  backgroundImage: 'url("images/carousel/1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const titleStyle = {
  color: "white",
  fontSize: 20,
  marginTop: 20,
  marginBottom: 20,
  padding: 10,
  borderRadius: 5,
  backgroundColor: "#8bc34a",
};

export function CustomerHome() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const cartStore = useStore(useCartStore);
  const masterpageStore = useStore(useMasterpageStore);
  const productStore = useStore(useProductStore);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { companyId } = authStore;

  useEffect(() => {
    productStore.find({ random: true }).then((res) => setProducts(res.data));
  }, []);

  function handleAddProduct(product: IProduct): void {
    cartStore.addProduct(companyId, { quantity: 1, product });
    masterpageStore.setCart(true);
  }

  return (
    <>
      <Carousel autoplay shape="bar" style={{ width: "100%", borderRadius: 5 }}>
        <div
          style={{
            ...carouselImgStyle,
            backgroundImage: 'url("images/carousel/1.jpg")',
          }}
        />
        <div
          style={{
            ...carouselImgStyle,
            backgroundImage: 'url("images/carousel/2.jpg")',
          }}
        />
        <div
          style={{
            ...carouselImgStyle,
            backgroundImage: 'url("images/carousel/3.jpg")',
          }}
        />
        <div
          style={{
            ...carouselImgStyle,
            backgroundImage: 'url("images/carousel/4.jpg")',
          }}
        />
        <div
          style={{
            ...carouselImgStyle,
            backgroundImage: 'url("images/carousel/5.jpg")',
          }}
        />
      </Carousel>

      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Promoções da semana
      </div>

      <ProductCard
        products={[...products, ...products, ...products]}
        onAdd={handleAddProduct}
        onDetails={(p) => router.replace(`/customers/products/${p.id}/details`)}
      />

      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Produtos
      </div>

      <ProductCard
        products={[...products, ...products, ...products]}
        onAdd={handleAddProduct}
        onDetails={(p) => router.replace(`/customers/products/${p.id}/details`)}
      />
    </>
  );
}
