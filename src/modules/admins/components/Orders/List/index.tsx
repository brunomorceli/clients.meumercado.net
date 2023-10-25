import { Item } from "./Item";
import { IOrderResult } from "@root/modules/admins/interfaces";
import { IOrder, OrdersStatusForm } from "@root/modules/shared";
import { useState } from "react";

interface OrderListProps {
  loading?: boolean;
  orders: IOrderResult[];
  onOrderDetails: (order: IOrderResult) => void;
  onClientDetails: (order: IOrderResult) => void;
  onChangeStatus: (order: IOrderResult) => void;
}

export function OrdersList(props: OrderListProps) {
  const [orderForm, setOrderForm] = useState<IOrderResult | null>(null);

  function handleChangeStatus(order: IOrder | IOrderResult): void {
    props.onChangeStatus(order as IOrderResult);
    setOrderForm(null);
  }

  return (
    <>
      {props.orders.map((item, index) => (
        <Item
          key={index}
          order={item}
          onOrderDetails={props.onOrderDetails}
          onClientDetails={props.onClientDetails}
          onChangeStatus={setOrderForm}
        />
      ))}
      <OrdersStatusForm
        order={orderForm}
        onSave={handleChangeStatus}
        onCancel={() => setOrderForm(null)}
      />
    </>
  );
}
