import { useOrderStore } from "@admins/stores";
import { useToasterStore } from "@shared/stores";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { OrdersList } from "./List";
import { Panel } from "rsuite";
import { EOrderStatus, TitleBase } from "@shared";
import { useRouter } from "next/router";
import { Search } from "./Search";
import { IFindOrder } from "../../interfaces/find-order.interface";
import { IOrderResult } from "../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

export function Orders() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const orderStore = useStore(useOrderStore);
  const [orders, setOrders] = useState<IOrderResult[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const inactiveStatuses = [EOrderStatus.CANCELED_BY_CLIENT, EOrderStatus.CANCELED_BY_COMPANY, EOrderStatus.DONE];

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    setProcessing(true);

    orderStore
      .find({ limit: 100 })
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function filterActiveOrders(order: IOrderResult) {
    return !inactiveStatuses.includes(order.status);
  }
  
  function filterInactiveOrders(order: IOrderResult) {
    return inactiveStatuses.includes(order.status);
  }

  function handleChangeStatus(order: IOrderResult): void {
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
        <h5 style={{ marginBottom: 10 }}><FontAwesomeIcon icon={faCartShopping} /> Pedidos em andamento</h5>
        <Panel bordered style={{ backgroundColor: "white", marginBottom: 30 }}>
          <OrdersList
            orders={orders.filter(filterActiveOrders)}
            loading={processing}
            onOrderDetails={(o) => router.replace(`/admins/orders/${o.id}/details`)}
            onClientDetails={(o) => router.replace(`/admins/customers/${o.userId}/details`)}
            onChangeStatus={handleChangeStatus}
          />
        </Panel>

        <h5 style={{ marginBottom: 10 }}><FontAwesomeIcon icon={faHourglassEnd} /> Pedidos concluídos/cancelados</h5>
        <Panel bordered style={{ backgroundColor: "white" }}>
          <OrdersList
            orders={orders.filter(filterInactiveOrders)}
            loading={processing}
            onOrderDetails={(o) => router.replace(`/admins/orders/${o.id}/details`)}
            onClientDetails={(o) => router.replace(`/admins/customers/${o.userId}`)}
            onChangeStatus={handleChangeStatus}
          />
        </Panel>
      </Panel>
    </>
  );
}
