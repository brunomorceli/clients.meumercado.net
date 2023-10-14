import { useOrderStore } from "@admins/stores";
import { useToasterStore } from "@shared/stores";
import { IOrder } from "@shared/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { OrdersList } from "./List";

interface LastOrdersProps {
  limit?: number;
}

export function LastOrders(props: LastOrdersProps) {
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
      .find({ limit: props.limit || 10 })
      .then((res) => setOrders(res.data))
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleUpdate(order: IOrder, observation: string): void {
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

  return (
    <OrdersList
      orders={orders}
      loading={processing}
      onCancel={handleUpdate}
    />
  );
}