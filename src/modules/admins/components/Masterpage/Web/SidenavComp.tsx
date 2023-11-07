import { useMasterpageStore, useAuthStore } from "@admins/stores";
import {
  ExclamationCircleOutlined,
  IdcardOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  faDolly,
  faPaintbrush,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, List, Typography, Modal } from "antd";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import { Nav, Sidenav } from "rsuite";

const panelStyles = {
  padding: "15px 20px",
  color: "#aaa",
};

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: "#34c3ff",
  color: " #fff",
};

export function SidenavComp() {
  const router = useRouter();
  const masterpageStore = useStore(useMasterpageStore);
  const authStore = useStore(useAuthStore);

  function handleGoTo(path: string): void {
    router.replace(path);
    masterpageStore.toggleDrawer();
  }

  function handleSignout() {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Typography>Deseja realmente sair?</Typography>,
      cancelText: "Cancelar",
      onOk: authStore.signout,
    });
  }

  return (
    <Sidenav style={{ height: 'calc(100vh - 64px)'}}>
      <Sidenav.Body>
        <Nav>
          <Nav.Item onClick={() => handleGoTo("/admins/orders")}>
            <Typography.Title level={4}>
              <ShoppingCartOutlined /> Pedidos
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={() => handleGoTo("/admins/products")}>
            <Typography.Title level={4}>
              <ShoppingOutlined /> Produtos
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={() => handleGoTo("/admins/customers")}>
            <Typography.Title level={4}>
              <TeamOutlined /> Clientes
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={() => handleGoTo("/admins/company")}>
            <Typography.Title level={4}>
              <ShopOutlined /> Empresa
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={() => handleGoTo("/admins/theme")}>
            <Typography.Title level={4}>
              <FontAwesomeIcon icon={faPaintbrush} /> Customizar tema
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={() => handleGoTo("/admins/members")}>
            <Typography.Title level={4}>
              <IdcardOutlined /> Colaboradores
            </Typography.Title>
          </Nav.Item>

          <Nav.Item onClick={handleSignout}>
            <Typography.Title level={4}>
              <LogoutOutlined /> Sair
            </Typography.Title>
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}
