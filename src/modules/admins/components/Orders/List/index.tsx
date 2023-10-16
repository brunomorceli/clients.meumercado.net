import { FlexboxGrid, List } from "rsuite";
import { Item } from "./Item";
import { IOrderResult } from "@root/modules/admins/interfaces";
import { Label } from "./styles";

interface OrderListProps {
  loading?: boolean;
  orders: IOrderResult[];
  onPick: (order: IOrderResult) => void;
  onSave: (order: IOrderResult) => void;
}

export function OrdersList(props: OrderListProps) {
  return (
    <>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={4}>
          <Label>Data</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <Label>Nome do Cliente</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Valor</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Status</Label>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <List hover style={{ cursor: "pointer" }}>
        {props.orders.map((item, index) => (
          <Item
            key={index}
            order={item}
            onPick={props.onPick}
            onSave={props.onSave}
          />
        ))}
      </List>
    </>
  );
}
