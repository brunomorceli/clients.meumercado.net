import { useOrderStore } from "@admins/stores";
import { useToasterStore } from "@shared/stores";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { OrdersList } from "./List";
import { Panel } from "rsuite";
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

  function handleSave(order: IOrderResult): void {
    const updateData = {
      id: order.id,
      status: order.status,
      observation: order.observation || "",
    };
    setProcessing(true);

    orderStore
      .update(updateData)
      .then(() => {
        toasterStore.success("Pedido atualizado com sucesso.");
        
        const list = [...orders];
        const index = list.findIndex((o) => o.id === order.id);
        list[index].status = order.status;

        setOrders(list);
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
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
      <TitleBase title="Pedidos" onBack={() => router.replace("/admins")} />
      <Panel
        bordered
        header={<Search onSearch={handleSearch} />}
        style={{ backgroundColor: "white" }}
      >
        <Panel bordered style={{ backgroundColor: "white" }}>
          <OrdersList
            orders={orders}
            loading={processing}
            onSave={handleSave}
            onPick={(o) => router.replace(`/admins/orders/${o.id}/details`)}
          />
        </Panel>
      </Panel>
    </>
  );
}
