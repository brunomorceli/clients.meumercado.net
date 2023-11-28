import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { Panel } from "rsuite";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

import { EOrderStatus, TitleBase } from "src/modules/shared";
import { useOrderStore } from "src/modules/admins/stores";
import { useToasterStore } from "src/modules/shared/stores";
import { OrdersList } from "./List";
import { Search } from "./Search";
import { IFindOrder } from "src/modules/admins/interfaces/find-order.interface";
import { IOrderResult } from "src/modules/admins/interfaces";
import { HomePageHandler } from "src/modules/admins/pages/HomePage";
import { OrdersDetailsHandler } from "src/modules/admins/pages/Orders/OrdersDetailsPage";
import { CustomersDetailsHandler } from "src/modules/admins/pages/Customers/CustomersDetailsPage";

export function Orders() {
  const navigate = useNavigate();
  const toasterStore = useStore(useToasterStore);
  const orderStore = useStore(useOrderStore);
  const [orders, setOrders] = useState<IOrderResult[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const inactiveStatuses = [
    EOrderStatus.CANCELED_BY_CLIENT,
    EOrderStatus.CANCELED_BY_COMPANY,
    EOrderStatus.DONE,
  ];

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
      <TitleBase
        title="Pedidos"
        onBack={() => navigate(HomePageHandler.navigate())}
      />
      <Panel
        bordered
        header={<Search onSearch={handleSearch} />}
        style={{ backgroundColor: "white" }}
      >
        <h5 style={{ marginBottom: 10 }}>
          <FontAwesomeIcon icon={faCartShopping} /> Pedidos em andamento
        </h5>
        <Panel bordered style={{ backgroundColor: "white", marginBottom: 30 }}>
          <OrdersList
            orders={orders.filter(filterActiveOrders)}
            loading={processing}
            onOrderDetails={(o) =>
              navigate(OrdersDetailsHandler.navigate(o.id.toString()))
            }
            onClientDetails={(o) =>
              navigate(CustomersDetailsHandler.navigate(o.userId.toString()))
            }
            onChangeStatus={handleChangeStatus}
          />
        </Panel>

        <h5 style={{ marginBottom: 10 }}>
          <FontAwesomeIcon icon={faHourglassEnd} /> Pedidos
          concluídos/cancelados
        </h5>
        <Panel bordered style={{ backgroundColor: "white" }}>
          <OrdersList
            orders={orders.filter(filterInactiveOrders)}
            loading={processing}
            onOrderDetails={(o) =>
              navigate(OrdersDetailsHandler.navigate(o.id.toString()))
            }
            onClientDetails={(o) =>
              navigate(CustomersDetailsHandler.navigate(o.userId.toString()))
            }
            onChangeStatus={handleChangeStatus}
          />
        </Panel>
      </Panel>
    </>
  );
}
