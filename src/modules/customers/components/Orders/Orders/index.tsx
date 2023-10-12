import { useOrderStore } from "@root/modules/customers/stores";
import { IOrder, useToasterStore } from "@root/modules/shared";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { OrdersList } from "./List";
import { Panel } from "rsuite";
import { OrderHeader } from "./List/OrderHeader";

export function Orders() {
  const toasterStore = useStore(useToasterStore);
  const orderStore = useStore(useOrderStore);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    setProcessing(true);

    orderStore
      .list({})
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleCancel(order: IOrder, observation: string): void {
    setProcessing(true);

    orderStore
      .cancel(order.id!, observation)
      .then(() => {
        toasterStore.success('Pedido cancelado com sucesso.');
        loadOrders();
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  return (
    <Panel header={<OrderHeader />} bordered style={{ backgroundColor: 'white' }}>
      <OrdersList
        orders={orders}
        loading={processing}
        onCancel={handleCancel}
      />
    </Panel>
  );
}