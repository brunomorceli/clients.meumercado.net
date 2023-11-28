import { Button, Col, FlexboxGrid } from "rsuite";
import { Label, Title } from "./styles";
import { EOrderStatus, EOrderStatusHandler, GeneralUtils } from "src/modules/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { IOrderResult } from "src/modules/admins/interfaces";

interface ItemProps {
  order: IOrderResult;
  onClientDetails: (order: IOrderResult) => void;
  onOrderDetails: (order: IOrderResult) => void;
  onChangeStatus: (order: IOrderResult) => void;
}

export function Item(props: ItemProps) {
  const { order, onChangeStatus, onOrderDetails, onClientDetails } = props;
  const canEdit = ![
    EOrderStatus.CANCELED_BY_CLIENT,
    EOrderStatus.CANCELED_BY_COMPANY,
    EOrderStatus.DONE,
  ].includes(order.status!);
  return (
    <FlexboxGrid justify="space-between" style={{ cursor: "pointer" }}>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={5}
        xl={5}
        xxl={5}
        onClick={() => onOrderDetails(order)}
      >
        <Label>Pedido</Label>
        <Title>{order.id}</Title>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={5}
        xl={5}
        xxl={5}
        onClick={() => onOrderDetails(order)}
      >
        <Label>Data de criação</Label>
        <Title>{new Date(order.createdAt!).toLocaleDateString()}</Title>
      </Col>
      <Col xs={24} sm={24} md={24} lg={5} xl={5} xxl={5}>
        <Label>Cliente</Label>
        <Button
          size="sm"
          appearance="subtle"
          style={{ marginLeft: -10 }}
          onClick={() => onClientDetails(order)}
        >
          <Title>
            {order.userName}
            &nbsp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: 14 }} />
          </Title>
        </Button>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={4}
        xl={4}
        xxl={4}
        onClick={() => onOrderDetails(order)}
      >
        <Label>Total</Label>
        <Title>{GeneralUtils.getAmountLabel(order.total)}</Title>
      </Col>
      <Col xs={24} sm={24} md={12} lg={5} xl={5} xxl={5}>
        <Label>Status</Label>
        {canEdit ? (
          <Button
            size="sm"
            style={{ marginLeft: -10 }}
            appearance="subtle"
            onClick={() => onChangeStatus(order)}
          >
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
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <hr style={{ margin: 5 }} />
      </Col>
    </FlexboxGrid>
  );
}
