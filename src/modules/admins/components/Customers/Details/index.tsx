import { Col, FlexboxGrid, IconButton, Placeholder } from "rsuite";
import { useEffect, useState } from "react";
import {
  ERoleType,
  IOrder,
  IUser,
  IUserHandler,
  PanelBase,
  TitleBase,
  WhatsappIcon,
  useToasterStore,
} from "@shared";
import { useStore } from "zustand";
import { useCustomerStore } from "@root/modules/admins/stores";
import { useRouter } from "next/router";
import { useOrderStore } from "@admins/stores";
import { Field, Label } from "./styles";
import { OrdersList } from "./List";

interface CustomerDetailsProps {
  userId?: string | null | undefined;
}

export function CustomerDetails(props: CustomerDetailsProps) {
  const { userId } = props;
  const router = useRouter();
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
        onBack={() => router.back()}
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
              {user.phoneNumber || "N/I"}
              {user.phoneNumber && (
                <>
                  &nbsp;
                  <IconButton
                    appearance="subtle"
                    icon={<WhatsappIcon />}
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send/?phone=${user.phoneNumber}&type=phone_number`,
                        "_blank"
                      )
                    }
                  />
                </>
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

      <PanelBase title="Últimas compras" hideTitleDivider>
        <OrdersList orders={orders} onChangeStatus={handleChangeStatus} />
        {orders.length === 0 && <h4>Nenhum resultado.</h4>}
      </PanelBase>
    </>
  );
}
