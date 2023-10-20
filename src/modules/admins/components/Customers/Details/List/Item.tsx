import { List, Panel } from "rsuite";
import { CustomPanel } from "./styles";
import { IOrder } from "@shared";
import { Products } from "./Products";
import { Order } from "./Order";
import { OrderProgress } from "@shared/components";

interface OrderListProps {
  order: IOrder;
  onChangeStatus: (order: IOrder) => void;
}

export function Item(props: OrderListProps) {
  const { order, onChangeStatus } = props;
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);

  return (
    <List.Item>
      <CustomPanel
        header={<Order order={order} onChangeStatus={onChangeStatus} />}
        collapsible
      >
        <Panel style={{ marginTop: 20, paddingTop: 20 }} bordered>
          <h6>Produtos adicionados</h6>
          <hr />
          <Products order={order} />

          <h6>Progresso</h6>
          <hr />
          <OrderProgress order={order} />
        </Panel>
      </CustomPanel>
    </List.Item>
  );
}
