import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductCard } from "@root/modules/customers/components";
import { useProductStore } from "@root/modules/customers/stores";
import { IProduct } from "@root/modules/shared";
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
};

export default function CustomersPage() {
  const productStore = useStore(useProductStore);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    productStore
      .find({})
      .then((res) => setProducts(res.data));
  }, []);
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

      <div
        style={{
          ...titleStyle,
          background: "linear-gradient(0deg, #558b2f 0%, #7abb4b 100%)",
        }}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Promoções da semana
      </div>

      <ProductCard
        products={[...products, ...products]}
        onSelect={(p) => console.log('select:', p)}
      />

      <div
        style={{
          ...titleStyle,
          background: "linear-gradient(0deg, #558b2f 0%, #7abb4b 100%)",
        }}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Produtos
      </div>

      <ProductCard
        products={[...products, ...products]}
        onSelect={(p) => console.log('select:', p)}
      />
    </>
  );
}
