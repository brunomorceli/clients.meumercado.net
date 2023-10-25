import { Button, List, Panel } from "rsuite";
import { CustomPanel } from "./styles";
import { IOrder, IProduct } from "@shared";
import { Products } from "./Products";
import { Order } from "./Order";
import { OrderProgress } from "@shared/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface OrderListProps {
  order: IOrder;
  onChangeStatus: (order: IOrder) => void;
  onDetails: (order: IOrder) => void;
  onProductDetails: (product: IProduct) => void;
}

export function Item(props: OrderListProps) {
  const { order, onChangeStatus, onDetails, onProductDetails } = props;
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
          <Products order={order} onDetails={onProductDetails} />

          <h6>Progresso</h6>
          <hr />
          <OrderProgress order={order} />
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <Button appearance="subtle" onClick={() => onDetails(order)}>
              Ver mais detalhes &nbsp;
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          </div>
        </Panel>
      </CustomPanel>
    </List.Item>
  );
}
