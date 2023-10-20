import { IOrder, OrdersStatusForm } from "@root/modules/shared";
import { List } from "rsuite";
import { Item } from "./Item";
import { useState } from "react";

interface OrderListProps {
  loading?: boolean;
  orders: IOrder[];
  onChangeStatus: (order: IOrder) => void;
}

export function OrdersList(props: OrderListProps) {
  const [orderForm, setOrderForm] = useState<IOrder | null>(null);

  function handleChangeStatus(order: IOrder): void {
    props.onChangeStatus(order);
    setOrderForm(null);
  }

  return (
    <>
      <List size="sm">
        {props.orders.map((item, index) => (
          <Item key={index} order={item} onChangeStatus={setOrderForm} />
        ))}
      </List>
      <OrdersStatusForm
        order={orderForm}
        onSave={handleChangeStatus}
        onCancel={() => setOrderForm(null)}
      />
    </>
  );
}
