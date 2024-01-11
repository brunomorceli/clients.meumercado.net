import { Placeholder } from "rsuite";
import {
  IOrder,
  OrderProgress,
  OrdersStatusForm,
  PanelBase,
  TitleBase,
  useToasterStore,
} from "src/modules/shared";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { GeneralData } from "./GeneralData";
import { useStore } from "zustand";
import { useOrderStore } from "src/modules/admins/stores";
import { Products } from "./Products";
import { CustomersDetailsHandler } from "src/modules/admins/pages/Customers/CustomersDetailsPage";
import { ProductsEditHandler } from "src/modules/admins/pages/Products/ProductsEditPage";

interface ItemProps {
  orderId?: number | null | undefined;
}

export function OrderDetails(props: ItemProps) {
  const navigate = useNavigate();
  const { orderId } = props;
  const toasterStore = useStore(useToasterStore);
  const orderStore = useStore(useOrderStore);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [orderForm, setOrderForm] = useState<IOrder | null>(null);
  const [processing, setProcessing] = useState<boolean>(true);

  useEffect(() => {
    orderId && loadOrder(orderId);
  }, [orderId]);

  function loadOrder(orderId: number) {
    setProcessing(true);

    orderStore
      .get(orderId)
      .then(setOrder)
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleChangeStatus(order: IOrder): void {
    const updateData = {
      id: order.id!,
      status: order.status!,
      observation: order.observation || "",
    };

    setProcessing(true);
    setOrderForm(null);

    orderStore
      .update(updateData)
      .then(() => {
        toasterStore.success("Pedido atualizado com sucesso.");
        loadOrder(order.id!);
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  if (processing) {
    return (
      <PanelBase title="Carregando">
        <Placeholder.Paragraph
          style={{ marginBottom: 20 }}
          graph="square"
          active
          rows={5}
        />
        <Placeholder.Paragraph
          style={{ marginBottom: 20 }}
          graph="square"
          active
          rows={10}
        />
      </PanelBase>
    );
  }

  return (
    <>
      <TitleBase title="Detalhes do pedido" onBack={() => navigate(-1)} />
      <PanelBase title="Dados gerais">
        {order && (
          <GeneralData
            order={order}
            onChangeStatus={setOrderForm}
            onCustomerDetails={(order) =>
              navigate(CustomersDetailsHandler.navigate(order.userId!))
            }
          />
        )}
      </PanelBase>

      <PanelBase title="Histórico do pedido">
        <OrderProgress order={order!} />
      </PanelBase>

      <PanelBase title="Produtos adicionados">
        <Products
          order={order!}
          onDetails={(p) => navigate(ProductsEditHandler.navigate(p.id!))}
        />
      </PanelBase>
      <OrdersStatusForm
        order={orderForm}
        onCancel={() => setOrderForm(null)}
        onSave={(o) => handleChangeStatus(o as IOrder)}
      />
    </>
  );
}
