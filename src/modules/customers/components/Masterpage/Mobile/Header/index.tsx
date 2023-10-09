import { Badge, Col, Dropdown, FlexboxGrid, Stack } from "rsuite";
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
  HeaderContainer,
  Item,
  CompanyName,
  SecondaryHeader,
  DropdownSettings,
} from "./styles";
import { ProductAutocomplete } from "../../..";
import { ICartProductHandler, IProduct } from "@shared/interfaces";
import { ConfirmModal } from "@shared/components";
import {
  faBagShopping,
  faCartShopping,
  faRightToBracket,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import MenuIcon from "@rsuite/icons/Menu";
import { useState } from "react";
import { Categories } from "./Categories";

interface HeaderProps {
  backgroundColor?: string;
  color?: string;
}

export function Header(props: HeaderProps) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const masterpageStore = useStore(useMasterpageStore);
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const products = company.id ? cartStore.getProducts(company.id) : [];
  const [showCategories, setShowCategories] = useState<boolean>(false);
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
      placement="bottomEnd"
      renderToggle={() => (
        <Item>
          <CogIcon />
        </Item>
      )}
    >
      <Dropdown.Item
        onSelect={() => router.replace("/customers/account")}
        icon={<UserInfoIcon />}
      >
        Meus dados
      </Dropdown.Item>
      <Dropdown.Item
        onSelect={() => router.replace("/customers/orders")}
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
      <HeaderContainer backgroundColor={props.backgroundColor}>
        <Stack alignItems="center" justifyContent="space-between">
          <Item
            style={{ marginLeft: 10 }}
            onClick={() => setShowCategories(true)}
          >
            <MenuIcon />
          </Item>
          <Stack.Item grow={1}>
            <CompanyName
              onClick={() => router.replace("/")}
              color={props.color}
            >
              {company.name}
            </CompanyName>
          </Stack.Item>
          <Stack.Item style={{ width: 110 }}>
            <Item onClick={masterpageStore.toggleCart}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ marginRight: 5 }}
              />
              &nbsp;
              {products.length !== 0 && <Badge content={products.length} />}
            </Item>

            {authStore.authenticated ? (
              <Settings />
            ) : (
              <Item onClick={() => masterpageStore.toggleLogin()}>
                <FontAwesomeIcon icon={faRightToBracket} />
              </Item>
            )}
          </Stack.Item>
        </Stack>
      </HeaderContainer>
      <SecondaryHeader backgroundColor={props.backgroundColor}>
        <ProductAutocomplete onPick={handleAddProduct} />
      </SecondaryHeader>
      <Categories
        options={company.categories}
        open={showCategories}
        onPick={(id) => router.replace(`/customers/products/categories/${id}`)}
        onClose={() => setShowCategories(false)}
      />

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
