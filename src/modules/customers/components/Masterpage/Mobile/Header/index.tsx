import { useStore } from "zustand";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Badge, Dropdown, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import MenuIcon from "@rsuite/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCartShopping,
  faRightToBracket,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import { ProductAutocomplete } from "src/modules/customers/components";
import { ICartProductHandler, IProduct } from "src/modules/shared/interfaces";
import { ConfirmModal } from "src/modules/shared/components";
import { Categories } from "./Categories";
import { AccountPageHandler } from "src/modules/customers/pages/Account/AccountPage";
import { OrdersPageHandler } from "src/modules/customers/pages/Orders/OrderPage";
import { HomePageHandler } from "src/modules/customers/pages/HompePage";
import { ProductsByCategoryPageHandler } from "src/modules/customers/pages/Products/ProductsByCategoryPage";
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

export function Header() {
  const navigate = useNavigate();
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
        onSelect={() => navigate(AccountPageHandler.navigate())}
        icon={<UserInfoIcon />}
      >
        Meus dados
      </Dropdown.Item>
      <Dropdown.Item
        onSelect={() => navigate(OrdersPageHandler.navigate())}
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
        <Stack alignItems="center" justifyContent="space-between">
          <Item
            style={{ marginLeft: 10 }}
            onClick={() => setShowCategories(true)}
          >
            <MenuIcon />
          </Item>
          <Stack.Item grow={1}>
            <CompanyName onClick={() => navigate(HomePageHandler.navigate())}>
              {company.name}
            </CompanyName>
          </Stack.Item>
          <Stack.Item style={{ width: 110 }}>
            {products.length !== 0 && (
              <Item onClick={masterpageStore.toggleCart}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ marginRight: 5 }}
                />
                &nbsp;
                <Badge content={products.length} />
              </Item>
            )}
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
      <SecondaryHeader>
        <ProductAutocomplete onPick={handleAddProduct} />
      </SecondaryHeader>
      <Categories
        options={company.categories}
        open={showCategories}
        onPick={(id) =>
          navigate(ProductsByCategoryPageHandler.navigate(id.toString()))
        }
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
