import { useOrderStore } from "@admins/stores";
import { useToasterStore } from "@shared/stores";
import { IOrder } from "@shared/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { OrdersList } from "./List";
import { Panel } from "rsuite";
import { OrderHeader } from "./List/OrderHeader";
import { TitleBase } from "@shared";
import { useRouter } from "next/router";
import { Search } from "./Search";
import { IFindOrder } from "../../interfaces/find-order.interface";
import { IOrderResult } from "../../interfaces";

export function Orders() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const orderStore = useStore(useOrderStore);
  const [orders, setOrders] = useState<IOrderResult[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    setProcessing(true);

    orderStore
      .find({})
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleUpdate(order: IOrderResult, observation: string): void {
    setProcessing(true);

    /*
    orderStore
      .update(order.id!, observation)
      .then(() => {
        toasterStore.success('Pedido cancelado com sucesso.');
        loadOrders();
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
      */
  }

  function handleSearch(data: IFindOrder): void {
    setProcessing(true);

    orderStore
      .find(data)
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  return (
    <>
      <TitleBase title="Pedidos" onBack={() => router.replace('/admins')}  />
      <Panel bordered header={<Search onSearch={handleSearch} />} style={{ backgroundColor: 'white' }}>
        <Panel header={<OrderHeader />} bordered style={{ backgroundColor: 'white' }}>
          <OrdersList
            orders={orders}
            loading={processing}
            onCancel={handleUpdate}
          />
        </Panel>
      </Panel>
    </>
  );
}