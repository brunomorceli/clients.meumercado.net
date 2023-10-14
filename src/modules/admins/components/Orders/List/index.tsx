import { IOrder } from "@shared";
import { List } from "rsuite";
import { Item } from "./Item";
import { IFindOrder } from "@admins/interfaces/find-order.interface";
import { IOrderResult } from "@root/modules/admins/interfaces";

interface OrderListProps {
  loading?: boolean;
  orders: IOrderResult[];
  onCancel: (order: IOrderResult, observation: string) => void;
}

export function OrdersList(props: OrderListProps) {
  return (
    <List>
      {props.orders.map((item, index) => (
        <Item key={index} order={item} onCancel={props.onCancel} />
      ))}
    </List>
  );
}
