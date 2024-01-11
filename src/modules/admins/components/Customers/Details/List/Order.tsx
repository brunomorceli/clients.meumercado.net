import { Button, Col, FlexboxGrid, Stack } from "rsuite";
import { Label, Title } from "./styles";
import {
  EOrderStatus,
  EOrderStatusHandler,
  GeneralUtils,
  IOrder,
} from "src/modules/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface OrderProps {
  order: IOrder;
  onChangeStatus: (order: IOrder) => void;
}

export function Order(props: OrderProps) {
  const { order, onChangeStatus } = props;
  const canEdit = ![
    EOrderStatus.CANCELED_BY_CLIENT,
    EOrderStatus.CANCELED_BY_COMPANY,
    EOrderStatus.DONE,
  ].includes(order.status!);
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);

  return (
    <FlexboxGrid justify="space-between">
      <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
        <Label>Pedido</Label>
        <Title>{order.id}</Title>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
        <Label>Data de criação</Label>
        <Title>{new Date(order.createdAt!).toLocaleDateString()}</Title>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
        <Label>Total</Label>
        <Title>{GeneralUtils.getAmountLabel(total)}</Title>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
        <Label>Status</Label>
        {canEdit ? (
          <Button size="sm" style={{ marginLeft: -10 }} appearance="subtle" onClick={() => onChangeStatus(order)}>
            <Title style={{ color: EOrderStatusHandler.color(order.status!) }}>
              {EOrderStatusHandler.label(order.status!)}
              &nbsp;
              <FontAwesomeIcon icon={faPenToSquare} />
            </Title>
          </Button>
        ) : (
          <>
            <Title style={{ color: EOrderStatusHandler.color(order.status!) }}>
              {EOrderStatusHandler.label(order.status!)}
            </Title>
          </>
        )}
      </Col>
    </FlexboxGrid>
  );
}
