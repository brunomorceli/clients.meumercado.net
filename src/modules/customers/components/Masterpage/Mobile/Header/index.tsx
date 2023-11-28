import { Badge, Dropdown, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useNavigate } from 'react-router';
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
import { ICartProductHandler, IProduct } from "src/modules/shared/interfaces";
import { ConfirmModal } from "src/modules/shared/components";
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
        <Stack alignItems="center" justifyContent="space-between">
          <Item
            style={{ marginLeft: 10 }}
            onClick={() => setShowCategories(true)}
          >
            <MenuIcon />
          </Item>
          <Stack.Item grow={1}>
            <CompanyName onClick={() => navigate("/")}>
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
        onPick={(id) => navigate(`/customers/products/categories/${id}`)}
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
