import { Button, FlexboxGrid } from "rsuite";
import { CustoCol, Label, Title } from "./styles";
import {
  Col24,
  EDeliveryType,
  EOrderStatus,
  EOrderStatusHandler,
  GeneralUtils,
  IOrder,
  IOrderHandler,
} from "src/modules/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

interface GeneralDataProps {
  order: IOrder;
  onCustomerDetails: (order: IOrder) => void;
  onChangeStatus: (order: IOrder) => void;
}

export function GeneralData(props: GeneralDataProps) {
  const { order, onCustomerDetails, onChangeStatus } = props;

  const canEdit = ![
    EOrderStatus.CANCELED_BY_CLIENT,
    EOrderStatus.CANCELED_BY_COMPANY,
    EOrderStatus.DONE,
  ].includes(order.status!);

  const Col12 = (props: any) => {
    const { children, ...rest } = props;
    return (
      <CustoCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} {...rest}>
        {children}
      </CustoCol>
    );
  };

  return (
    <FlexboxGrid justify="space-between">
      <CustoCol xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Label>Cliente</Label>
        <Button
          size="sm"
          appearance="subtle"
          style={{ marginLeft: -10 }}
          onClick={() => onCustomerDetails(order)}
        >
          <Title>{order.user ? order.user.name : "N/I"}</Title>
          &nbsp;
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      </CustoCol>
      <Col12>
        <Label>Número do Pedido</Label>
        <Title>{order.id}</Title>
      </Col12>
      <Col12>
        <Label>Data de criação</Label>
        <Title>{new Date(order.createdAt!).toLocaleDateString()}</Title>
      </Col12>
      <Col12>
        <Label>Total</Label>
        <Title style={{ color: "green" }}>
          {GeneralUtils.getAmountLabel(IOrderHandler.total(order))}
        </Title>
      </Col12>
      <Col12>
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
      </Col12>
      <Col12>
        <Label>Tipo de entrega</Label>
        <Title>
          {order.deliveryType === EDeliveryType.DELIVERY ? 'Entrega a domicílio': 'Retirada na loja'}
        </Title>
      </Col12>
      {order.deliveryType === EDeliveryType.DELIVERY &&
        <Col24>
          <Label>Endereço de entrega</Label>
          <Title>
            {GeneralUtils.getFullAddress(order.user!)}
          </Title>
        </Col24>
      }
    </FlexboxGrid>
  );
}
