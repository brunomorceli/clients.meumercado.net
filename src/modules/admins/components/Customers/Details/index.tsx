import { Button, IconButton, Placeholder } from "rsuite";
import { useCallback, useEffect, useState } from "react";
import {
  ERoleType,
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
import { IOrderResult } from "../../../interfaces";
import { useOrderStore } from "@admins/stores";
import { Container, Field, Label } from "./styles";
import { Orders } from "./Orders";

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
  const [orders, setOrders] = useState<IOrderResult[]>([]);

  const [processing, setProcessing] = useState<boolean>(false);
  const loadUser = useCallback(
    (userId: string) => {
      setProcessing(true);

      customerStore
        .get(userId)
        .then(setUser)
        .catch(toasterStore.error)
        .finally(() => setProcessing(false));
    },
    [customerStore, toasterStore]
  );

  function loadOrders(userId: string) {
    orderStore
      .find({ limit: 20, userId })
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  useEffect(() => {
    if (userId) {
      loadUser(userId);
      loadOrders(userId);
    }
  }, [userId]);

  if (processing) {
    return <Placeholder.Paragraph style={{ marginTop: 30 }} rows={10} active />;
  }

  return (
    <>
      <TitleBase
        title={user.id ? "Dados do cliente" : "Novo cliente"}
        onBack={() => router.replace("/admins/customers")}
      />

      <PanelBase title="Dados pessoais">
        <Container>
          <Label>Nome</Label>
          <Field>{user.name}</Field>
        </Container>
        <Container>
          <Label>Email</Label>
          <Field>{user.email}</Field>
        </Container>
        <Container>
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
        </Container>
        <Container>
          <Label>CPF/CNPJ</Label>
          <Field>{user.cpfCnpj}</Field>
        </Container>
      </PanelBase>

      <PanelBase title="Endereço">
        <Container>
          <Label>Endereço</Label>
          <Field>{user.address}</Field>
        </Container>
        <Container>
          <Label>Número</Label>
          <Field>{user.addressNumber}</Field>
        </Container>
        <Container>
          <Label>Bairro</Label>
          <Field>{user.neighborhood}</Field>
        </Container>
        <Container>
          <Label>Complemento</Label>
          <Field>{user.addressComplement}</Field>
        </Container>
        <Container>
          <Label>Cidade</Label>
          <Field>{user.city}</Field>
        </Container>
        <Container>
          <Label>Estado</Label>
          <Field>{user.state}</Field>
        </Container>
      </PanelBase>

      <PanelBase title="Últimas compras">
        <Orders
          orders={orders}
          onClick={(order) => console.log("click:", order)}
          onDetails={(order) => console.log("details:", order)}
        />
      </PanelBase>
    </>
  );
}
