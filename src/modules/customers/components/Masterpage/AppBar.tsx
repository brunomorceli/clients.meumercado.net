/* eslint-disable @next/next/no-img-element */
import { Badge, Col, Divider, FlexboxGrid, Nav, Navbar } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
} from "@customers/stores";
import { CustomNavbar } from "./styles";
import { AppbarCategory } from "./AppbarCategory";
import { ProductAutocomplete } from "..";
import { ICartProductHandler, IProduct } from "@shared/interfaces";
import { ConfirmModal } from "@shared/components";

import {
  faBagShopping,
  faCartShopping,
  faHeart,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import { useState } from "react";

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
      <CustomNavbar>
        <div style={{ width: "50%", position: "fixed", top: 10, left: "25%" }}>
          <ProductAutocomplete onPick={handleAddProduct} />
        </div>
        <Navbar appearance="subtle">
          <Nav>
            {company.logo ? (
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
            )}
            <Nav.Item></Nav.Item>
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
        <Nav style={{ width: "100%", borderColor: 'red' }} appearance="subtle">
          <FlexboxGrid justify="center">
            {company.categories.map((item, index) => (
              <AppbarCategory
                key={index}
                item={item}
                onPick={(id) =>
                  router.replace(`/customers/products/categories/${id}`)
                }
              />
            ))}
          </FlexboxGrid>
        </Nav>
      </CustomNavbar>
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
