import { useMasterpageStore, useUserStore } from "@/stores";
import {
  ExclamationCircleOutlined,
  IdcardOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { faDolly, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, List, Typography, Modal } from "antd";
import { useStore } from "zustand";
import { DrawerListItem } from "./styles";
import { useRouter } from "next/router";

export function DrawerComp() {
  const router = useRouter();
  const masterpageStore = useStore(useMasterpageStore);
  const userStore = useStore(useUserStore);

  function handleGoTo(path: string): void {
    router.replace(path);
    masterpageStore.toggleDrawer();
  }

  function handleSignout() {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Typography>Deseja realmente sair?</Typography>,
      cancelText: 'Cancelar',
      onOk: userStore.signout,
    });
  }

  return (
    <Drawer
      placement="left"
      title={process.env.NEXT_PUBLIC_APP_NAME || "N/A"}
      open={masterpageStore.drawer}
      onClose={masterpageStore.toggleDrawer}
    >
      <List size="small">
        <DrawerListItem onClick={() => handleGoTo('companies')}>
          <Typography.Title level={4}>
            <ShopOutlined /> Empresas
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('products')}>
          <Typography.Title level={4}>
            <ShoppingOutlined /> Produtos
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('clients')}>
          <Typography.Title level={4}>
            <TeamOutlined /> Clientes
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('categories')}>
          <Typography.Title level={4}>
            <TagsOutlined /> Categorias
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('employees')}>
          <Typography.Title level={4}>
            <IdcardOutlined /> Colaboradores
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('carts')}>
          <Typography.Title level={4}>
            <ShoppingCartOutlined /> Pedidos
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('deliveries')}>
          <Typography.Title level={4}>
            <FontAwesomeIcon icon={faTruck} /> Entregas
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={() => handleGoTo('stock')}>
          <Typography.Title level={4}>
            <FontAwesomeIcon icon={faDolly} /> Estoque
          </Typography.Title>
        </DrawerListItem>

        <DrawerListItem onClick={handleSignout}>
          <Typography.Title level={4}>
            <LogoutOutlined /> Sair
          </Typography.Title>
        </DrawerListItem>
      </List>
    </Drawer>
  );
}
