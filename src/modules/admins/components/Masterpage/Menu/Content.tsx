import {
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { faCreditCard, faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuButton } from "./styles";

interface MenuContent {
  onGo: (path: string) => void;
  onSignout: () => void;
}

export function MenuContent(props: MenuContent) {
  return (
    <>
      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/orders")}
      >
        <ShoppingCartOutlined /> Pedidos
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/products")}
      >
        <ShoppingOutlined /> Produtos
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/customers")}
      >
        <TeamOutlined /> Clientes
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/company")}
      >
        <ShopOutlined /> Empresa
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/theme")}
      >
        <FontAwesomeIcon icon={faPaintbrush} /> Alterar tema
      </MenuButton>

      <MenuButton
        size="lg"
        appearance="subtle"
        block
        onClick={() => props.onGo("/admins/plan")}
      >
        <FontAwesomeIcon icon={faCreditCard} /> Dados do plano
      </MenuButton>

      <MenuButton size="lg" appearance="subtle" block onClick={props.onSignout}>
        <LogoutOutlined /> Sair
      </MenuButton>
    </>
  );
}
