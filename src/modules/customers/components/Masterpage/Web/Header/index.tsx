import { Badge, Col, Dropdown, FlexboxGrid, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useNavigate } from "react-router";
import { useStore } from "zustand";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
} from "src/modules/customers/stores";
import {
  HeaderContainer,
  Item,
  CompanyName,
  SecondaryHeader,
  DropdownSettings,
} from "./styles";
import { ProductAutocomplete } from "src/modules/customers/components";
import { ICartProductHandler, IProduct } from "src/modules/shared/interfaces";
import { ConfirmModal } from "src/modules/shared/components";
import {
  faBagShopping,
  faCartShopping,
  faHouse,
  faPhone,
  faRightToBracket,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import { useState } from "react";
import { Categories } from "./Categories";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";

export function Header() {
  const navigate = useNavigate();
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

  const Settings = () => (
    <DropdownSettings
      trigger="hover"
      renderToggle={() => (
        <Item>
          <CogIcon /> Configurações
        </Item>
      )}
    >
      <Dropdown.Item
        onSelect={() => navigate("/customers/account")}
        icon={<UserInfoIcon />}
      >
        Meus dados
      </Dropdown.Item>
      <Dropdown.Item
        onSelect={() => navigate("/customers/orders")}
        icon={<FontAwesomeIcon icon={faBagShopping} />}
      >
        Meus pedidos
      </Dropdown.Item>
      <Dropdown.Item
        onSelect={() => setShowExitModal(true)}
        icon={<FontAwesomeIcon icon={faUpRightFromSquare} />}
      >
        Sair
      </Dropdown.Item>
    </DropdownSettings>
  );

  return (
    <>
      <HeaderContainer>
        <Stack alignItems="center" justifyContent="flex-start">
          <CompanyName onClick={() => navigate("/")}>
            {company.logo ? (
              <img src={company.logo} height={45} />
            ) : (
              company.name
            )}
          </CompanyName>
          <Stack.Item grow={1}>
            <ProductAutocomplete onPick={handleAddProduct} />
          </Stack.Item>
          {products.length !== 0 && (
            <Item onClick={masterpageStore.toggleCart}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ marginRight: 5 }}
              />
              Carrinho &nbsp;
              <Badge content={products.length} />
            </Item>
          )}
          {authStore.authenticated ? (
            <Settings />
          ) : (
            <Item onClick={() => masterpageStore.toggleLogin()}>
              <FontAwesomeIcon icon={faRightToBracket} />
              &nbsp; Entrar | Cadastrar
            </Item>
          )}
        </Stack>
      </HeaderContainer>
      <SecondaryHeader>
        <Item onClick={() => navigate("/customers")}>
          <FontAwesomeIcon icon={faHouse} /> Início
        </Item>
        <Item>
          <FontAwesomeIcon icon={faBagShopping} /> Produtos
          <ArrowDownLineIcon />
        </Item>
        <Item>
          <FontAwesomeIcon icon={faPhone} /> Contato
        </Item>
        <div className="categories">
          <FlexboxGrid justify="center" align="top">
            <Col md={22} lg={22} xl={22} xxl={22}>
              <Categories
                options={company.categories}
                onPick={(id) =>
                  navigate(`/customers/products/categories/${id}`)
                }
              />
            </Col>
          </FlexboxGrid>
        </div>
      </SecondaryHeader>

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
