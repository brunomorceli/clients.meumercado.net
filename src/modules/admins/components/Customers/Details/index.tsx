import { Button, Col, FlexboxGrid, Placeholder } from "rsuite";
import { useEffect, useState } from "react";
import {
  ERoleType,
  GeneralUtils,
  IOrder,
  IUser,
  IUserHandler,
  PanelBase,
  TitleBase,
  WhatsappIcon,
  useToasterStore,
} from "src/modules/shared";
import { useStore } from "zustand";
import { useCustomerStore } from "src/modules/admins/stores";
import { useNavigate } from 'react-router';
import { useOrderStore } from "src/modules/admins/stores";
import { Field, Label } from "./styles";
import { OrdersList } from "./List";
import { OrdersDetailsHandler } from "src/modules/admins/pages/Orders/OrdersDetailsPage";
import { ProductsEditHandler } from "src/modules/admins/pages/Products/ProductsEditPage";

interface CustomerDetailsProps {
  userId?: string | null | undefined;
}

export function CustomerDetails(props: CustomerDetailsProps) {
  const { userId } = props;
  const navigate = useNavigate();
  const toasterStore = useStore(useToasterStore);
  const customerStore = useStore(useCustomerStore);
  const orderStore = useStore(useOrderStore);
  const [user, setUser] = useState<IUser>(
    IUserHandler.empty(ERoleType.CUSTOMER)
  );
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      loadUser(userId);
      loadOrders(userId);
    }
  }, [userId]);

  function loadUser(userId: string): void {
    setProcessing(true);

    customerStore
      .get(userId)
      .then(setUser)
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function loadOrders(userId: string) {
    orderStore
      .findByUser({ limit: 20, userId })
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleChangeStatus(order: IOrder): void {
    setProcessing(true);

    orderStore
      .update({
        id: order.id!,
        status: order.status!,
        observation: order.observation || "",
      })
      .then(() => {
        loadOrders(userId!);
        toasterStore.success("Pedido atualizado com sucesso.");
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  if (processing) {
    return <Placeholder.Paragraph style={{ marginTop: 30 }} rows={10} active />;
  }

  return (
    <>
      <TitleBase
        title={user.id ? "Dados do cliente" : "Novo cliente"}
        onBack={() => navigate(-1)}
      />

      <PanelBase title="Dados pessoais">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Nome</Label>
            <Field>{user.name}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Email</Label>
            <Field>{user.email}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Telefone</Label>
            <Field>
              {user.phoneNumber ? (
                <Button
                  style={{ marginLeft: -10 }}
                  appearance="subtle"
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send/?phone=${user.phoneNumber}&type=phone_number`,
                      "_blank"
                    )
                  }
                >
                  {GeneralUtils.maskPhonenumber(user.phoneNumber)}
                  &nbsp;
                  <WhatsappIcon />
                </Button>
              ) : (
                "N/I"
              )}
            </Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>CPF/CNPJ</Label>
            <Field>{user.cpfCnpj}</Field>
          </Col>
        </FlexboxGrid>
      </PanelBase>

      <PanelBase title="Endereço">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Endereço</Label>
            <Field>{user.address}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Número</Label>
            <Field>{user.addressNumber}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Bairro</Label>
            <Field>{user.neighborhood}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Complemento</Label>
            <Field>{user.addressComplement}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Cidade</Label>
            <Field>{user.city}</Field>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Label>Estado</Label>
            <Field>{user.state}</Field>
          </Col>
        </FlexboxGrid>
      </PanelBase>

      <PanelBase title="Últimos pedidos" hideTitleDivider>
        <OrdersList
          orders={orders}
          onChangeStatus={handleChangeStatus}
          onDetails={(o) => navigate(OrdersDetailsHandler.navigate(o.id!.toString()))}
          onProductDetails={(p) => navigate(ProductsEditHandler.navigate(p.id!.toString()))}
        />
        {orders.length === 0 && <h4>Nenhum resultado.</h4>}
      </PanelBase>
    </>
  );
}
