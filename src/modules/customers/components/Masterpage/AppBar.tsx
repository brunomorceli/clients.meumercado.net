/* eslint-disable @next/next/no-img-element */
import { Col, FlexboxGrid, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useCartStore, useCompanyStore } from "@customers/stores";
import { CustomNavbar } from "./styles";
import { AppbarCategory } from "./AppbarCategory";
import { ProductAutocomplete, ProductForm } from "..";
import { useState } from "react";
import {
  ICartProduct,
  ICartProductHandler,
  IProduct,
} from "@root/modules/shared";

export function AppBar() {
  const router = useRouter();
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const [cartProduct, setCartProduct] = useState<ICartProduct | null>(null);

  function handlePickProduct(product: IProduct): void {
    const existingCartProduct = cartStore.getProduct(company.id!, product.id!);
    setCartProduct(
      existingCartProduct
        ? { ...existingCartProduct, product }
        : ICartProductHandler.empty(product)
    );
  }

  function handleAddProduct(product: ICartProduct): void {
    cartStore.addProduct(company.id!, product);
    setCartProduct(null);
  }

  return (
    <>
      <CustomNavbar>
        <Nav>
          {company.logo ? (
            <Nav.Item onClick={() => router.replace("/")}>
              <img
                alt="logo"
                src={company.logo}
                height={90}
                style={{ display: "flex", flexDirection: "column", margin: 5 }}
              />
            </Nav.Item>
          ) : (
            <h5>{company.name}</h5>
          )}
          {company.categories.map((item, index) => (
            <AppbarCategory
              key={index}
              item={item}
              onPick={(id) => console.log("selected category:", id)}
            />
          ))}
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<CogIcon />}>Configurações</Nav.Item>
        </Nav>
        <Col xs={24}>
          <FlexboxGrid justify="center" style={{ margin: 10 }}>
            <Col xs={24} sm={24} md={18} lg={12} xl={12} xxl={12}>
              <ProductAutocomplete onPick={handlePickProduct} />
            </Col>
          </FlexboxGrid>
        </Col>
      </CustomNavbar>
      <ProductForm
        product={cartProduct}
        onClose={() => setCartProduct(null)}
        onSave={handleAddProduct}
      />
    </>
  );
}
