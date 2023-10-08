/* eslint-disable @next/next/no-img-element */
import { Badge, Col, Divider, FlexboxGrid, Nav, Navbar, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
} from "@customers/stores";
import {
  CustomNavCategories,
  CustomNavbar,
  CustomNavbarTitle,
  WebAppbar,
  WebAppbarItem,
  WebAppbarTitle,
  WebCategories,
} from "./styles";
import { AppbarCategory } from "./AppbarCategory";
import { ProductAutocomplete } from "..";
import { ICartProductHandler, IProduct } from "@shared/interfaces";
import { ConfirmModal } from "@shared/components";

import {
  faBagShopping,
  faCartShopping,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import { useState } from "react";
import { AppBarTitle } from "@root/modules/admins/components/Masterpage/styles";

export function AppBar() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const masterpageStore = useStore(useMasterpageStore);
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const products = company.id ? cartStore.getProducts(company.id) : [];
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  function handleAddProduct(product: IProduct): void {
    if (!products.some((p) => p.product.id === product.id)) {
      cartStore.addProduct(company.id!, ICartProductHandler.empty(product));
    }

    masterpageStore.setCart(true);
  }

  function handleConfirmExit(): void {
    authStore.signout();
    setShowExitModal(false);
  }

  return (
    <>
      <WebAppbar>
        <Stack alignItems="center" justifyContent="flex-start">
          <WebAppbarTitle onClick={() => router.replace("/")}>
            {company.name}
          </WebAppbarTitle>
          <Stack.Item grow={1}>
            <ProductAutocomplete onPick={handleAddProduct} />
          </Stack.Item>
          <WebAppbarItem onClick={masterpageStore.toggleCart}>
            <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: 5 }} />{" "}
            Carrinho
            {products.length !== 0 && (
              <>
                &nbsp;
                <Badge content={products.length} />
              </>
            )}
          </WebAppbarItem>
        </Stack>
      </WebAppbar>
      <WebCategories>
      <CustomNavCategories appearance="subtle">
        <Nav style={{ width: "100%" }} appearance="subtle">
          <FlexboxGrid justify="center">
            {company.categories.map((item, index) => (
              <AppbarCategory
                key={index}
                option={item}
                onPick={(id) =>
                  router.replace(`/customers/products/categories/${id}`)
                }
              />
            ))}
          </FlexboxGrid>
        </Nav>
      </CustomNavCategories>
      </WebCategories>
    </>
  );

  return (
    <>
      <CustomNavbar>
        <div style={{ width: "50%", position: "fixed", top: 10, left: "25%" }}>
          <ProductAutocomplete onPick={handleAddProduct} />
        </div>
        <Navbar appearance="subtle">
          <Nav>
            {/*company.logo ? (
              <Nav.Item onClick={() => router.replace("/")}>
                <img
                  alt="logo"
                  src={company.logo}
                  height={90}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 5,
                  }}
                />
              </Nav.Item>
            ) : (
              <h5>{company.name}</h5>
            )*/}
            <CustomNavbarTitle onClick={() => router.replace("/")}>
              {company.name}
            </CustomNavbarTitle>
          </Nav>
          <Nav pullRight>
            {authStore.authenticated ? (
              <Nav.Menu
                eventKey="1"
                title="Configurações"
                icon={<CogIcon />}
                noCaret
              >
                <Nav.Item
                  onSelect={() => router.replace("/customers/account")}
                  icon={<UserInfoIcon />}
                >
                  Meus dados
                </Nav.Item>
                <Nav.Item
                  onSelect={() => router.replace("/customers/orders")}
                  icon={<FontAwesomeIcon icon={faBagShopping} />}
                >
                  &nbsp; Meus pedidos
                </Nav.Item>
                <Divider />
                <Nav.Item
                  onSelect={() => setShowExitModal(true)}
                  icon={<FontAwesomeIcon icon={faUpRightFromSquare} />}
                >
                  Sair
                </Nav.Item>
              </Nav.Menu>
            ) : (
              <Nav.Item onClick={() => masterpageStore.setLogin(true)}>
                Entrar
              </Nav.Item>
            )}
            <Nav.Menu
              noCaret
              icon={<FontAwesomeIcon icon={faCartShopping} />}
              title={
                <>
                  Carrinho
                  {products.length !== 0 && (
                    <>
                      &nbsp;
                      <Badge content={products.length} />
                    </>
                  )}
                </>
              }
              onClick={masterpageStore.toggleCart}
            />
          </Nav>
        </Navbar>
      </CustomNavbar>
      <CustomNavCategories appearance="subtle">
        <Nav style={{ width: "100%" }} appearance="subtle">
          <FlexboxGrid justify="center">
            {company.categories.map((item, index) => (
              <AppbarCategory
                key={index}
                option={item}
                onPick={(id) =>
                  router.replace(`/customers/products/categories/${id}`)
                }
              />
            ))}
          </FlexboxGrid>
        </Nav>
      </CustomNavCategories>
      <ConfirmModal
        open={showExitModal}
        onConfirm={handleConfirmExit}
        onClose={() => setShowExitModal(false)}
      >
        <h4>Sair</h4>
        Deseja realmente sair?
      </ConfirmModal>
    </>
  );
}
