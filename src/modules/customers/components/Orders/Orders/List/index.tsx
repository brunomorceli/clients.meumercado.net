import { IOrder } from "@root/modules/shared";
import { List } from "rsuite";
import { Item } from "./Item";

interface OrderListProps {
  loading?: boolean;
  orders: IOrder[];
  onCancel: (order: IOrder) => void;
}

export function OrdersList(props: OrderListProps) {
  return (
    <List>
      {props.orders.map((item, index) => (
        <Item
          key={index}
          order={item}
          onCancel={(order) => console.log("order:", order)}
        />
      ))}
    </List>
  );
}
