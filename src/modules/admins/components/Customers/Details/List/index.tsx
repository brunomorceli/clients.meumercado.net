import { IOrder, IProduct, OrdersStatusForm } from "src/modules/shared";
import { List } from "rsuite";
import { Item } from "./Item";
import { useState } from "react";
interface OrderListProps {
  loading?: boolean;
  orders: IOrder[];
  onChangeStatus: (order: IOrder) => void;
  onDetails: (order: IOrder) => void;
  onProductDetails: (product: IProduct) => void;
}

export function OrdersList(props: OrderListProps) {
  const [orderForm, setOrderForm] = useState<IOrder | null>(null);

  function handleChangeStatus(order: IOrder | IOrder): void {
    props.onChangeStatus(order);
    setOrderForm(null);
  }

  return (
    <>
      <List size="sm">
        {props.orders.map((item, index) => (
          <Item
            key={index}
            order={item}
            onChangeStatus={setOrderForm}
            onDetails={props.onDetails}
            onProductDetails={props.onProductDetails}
          />
        ))}
      </List>
      <OrdersStatusForm
        order={orderForm}
        onSave={(o) => handleChangeStatus(o as IOrder)}
        onCancel={() => setOrderForm(null)}
      />
    </>
  );
}
