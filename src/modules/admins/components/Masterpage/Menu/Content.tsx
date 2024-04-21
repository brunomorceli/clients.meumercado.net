import {
  faBagShopping,
  faCartShopping,
  faCreditCard,
  faDoorOpen,
  faPaintbrush,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { OrdersHandler } from "src/modules/admins/pages/Orders/OrdersPage";
import { ProductsHandler } from "src/modules/admins/pages/Products/ProductsPage";
import { CustomersHandler } from "src/modules/admins/pages/Customers/CustomersPage";
import { CompaniesHandler } from "src/modules/admins/pages/Companies/CompaniesPage";
import { ThemePageHandler } from "src/modules/admins/pages/ThemePage";
import { PlansPageHandler } from "src/modules/admins/pages/Plans/PlansPage";
import { MenuButton } from "./styles";
import { useStore } from "zustand";
import { useAuthStore } from "src/modules/admins/stores";

interface MenuContentProps {
  onGo: (path: string) => void;
  onSignout: () => void;
}

export function MenuContent(props: MenuContentProps) {
  const authStore = useStore(useAuthStore);
  return (
    <>
      {authStore.subscription?.isActive && (
        <>
          <MenuButton
            size="lg"
            appearance="subtle"
            block
            onClick={() => props.onGo(OrdersHandler.navigate())}
          >
            <FontAwesomeIcon icon={faCartShopping} /> Meus pedidos
          </MenuButton>
          <MenuButton
            size="lg"
            appearance="subtle"
            block
            onClick={() => props.onGo(ProductsHandler.navigate())}
          >
            <FontAwesomeIcon icon={faBagShopping} /> Meus produtos
          </MenuButton>

          <MenuButton
            size="lg"
            appearance="subtle"
            block
            onClick={() => props.onGo(CustomersHandler.navigate())}
          >
            <FontAwesomeIcon icon={faUsers} /> Meus clientes
          </MenuButton>

          <MenuButton
            size="lg"
            appearance="subtle"
            block
            onClick={() => props.onGo(ThemePageHandler.navigate())}
          >
            <FontAwesomeIcon icon={faPaintbrush} /> Alterar tema
          </MenuButton>
        </>
      )}

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo(CompaniesHandler.navigate())}
      >
        <FontAwesomeIcon icon={faStore} /> Dados da empresa
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo(PlansPageHandler.navigate())}
      >
        <FontAwesomeIcon icon={faCreditCard} /> Dados do plano
      </MenuButton>

      <MenuButton size="lg" appearance="subtle" block onClick={props.onSignout}>
        <FontAwesomeIcon icon={faDoorOpen} /> Sair
      </MenuButton>
    </>
  );
}
