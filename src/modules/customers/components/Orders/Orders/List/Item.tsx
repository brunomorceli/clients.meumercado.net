import { Steps, FlexboxGrid, List, Panel, Button, Timeline } from "rsuite";
import { CustomTimeline, Label, Subtitle, Title } from "./styles";
import {
  ConfirmModal,
  EOrderStatus,
  EOrderStatusHandler,
  GeneralUtils,
  IOrder,
} from "@shared";
import {
  faBoxOpen,
  faClipboardCheck,
  faEnvelopeCircleCheck,
  faMotorcycle,
  faRectangleXmark,
  faTape,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import BlockIcon from "@rsuite/icons/Block";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrderListProps {
  order: IOrder;
  onCancel: (order: IOrder) => void;
}

export function Item(props: OrderListProps) {
  const { order, onCancel } = props;
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);
  const isCanceled = [
    EOrderStatus.CANCELED_BY_CLIENT,
    EOrderStatus.CANCELED_BY_COMPANY,
  ].includes(order.status!);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const Header = () => (
    <>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={8}>
          <Label>Data</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Label>Valor</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Label>Status</Label>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={8}>
          <Title>{new Date(order.createdAt!).toLocaleDateString()}</Title>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Title>{GeneralUtils.getAmountLabel(total)}</Title>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Title>
            <Label style={{ color: EOrderStatusHandler.color(order.status!) }}>
              {EOrderStatusHandler.label(order.status!)}
            </Label>
          </Title>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );

  const Products = () => (
    <>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Label>Nome</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Qtd.</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Preço</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Total</Label>
        </FlexboxGrid.Item>
      </FlexboxGrid>
        <hr />
      {order.orderProducts.map((op, index) => (
        <>
          <FlexboxGrid key={index}>
            <FlexboxGrid.Item colspan={12}>
              <Title>{op.product!.label}</Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>
                {op.quantity!}
                {GeneralUtils.getSulfixLabel(op.product!.quantitySulfix, " ")}
              </Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>{GeneralUtils.getAmountLabel(op.price)}</Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>
                {GeneralUtils.getAmountLabel(op.product!.price * op.quantity)}
              </Title>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <hr />
        </>
      ))}
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={20}>
          <Title>Total</Title>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Title>{GeneralUtils.getAmountLabel(total)}</Title>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );

  const Progress = () => (
    <CustomTimeline>
      <Timeline.Item dot={<FontAwesomeIcon icon={faEnvelopeCircleCheck} />}>
        <p>
          <Title>Pedido enviado.</Title>
          <Label>{GeneralUtils.localTime(order.createdAt, true)}</Label>
        </p>
      </Timeline.Item>
      {order.preparingAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faTape} />}>
          <p>
            <Title>{EOrderStatusHandler.label(EOrderStatus.PREPARING)}</Title>
            <Label>{GeneralUtils.localTime(order.preparingAt, true)}</Label>
          </p>
        </Timeline.Item>
      }
      {order.shippingAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faTruckArrowRight} />}>
          <p>
            <Title>{EOrderStatusHandler.label(EOrderStatus.SHIPPING)}</Title>
            <Label>{GeneralUtils.localTime(order.shippingAt, true)}</Label>
          </p>
        </Timeline.Item>
      }
      {order.deliveringAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faMotorcycle} />}>
          <p>
            <Title>{EOrderStatusHandler.label(EOrderStatus.DELIVERING)}</Title>
            <Label>{GeneralUtils.localTime(order.deliveringAt, true)}</Label>
          </p>
        </Timeline.Item>
      }
      {order.doneAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faBoxOpen} />}>
          <p>
            <Title>{EOrderStatusHandler.label(EOrderStatus.DONE)}</Title>
            <Label>{GeneralUtils.localTime(order.doneAt, true)}</Label>
          </p>
        </Timeline.Item>
      }
      {order.canceledByClientAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faRectangleXmark} />}>
          <p>
            <Title>
              {EOrderStatusHandler.label(EOrderStatus.CANCELED_BY_CLIENT)}
            </Title>
            <Label>
              {GeneralUtils.localTime(order.canceledByClientAt, true)}
            </Label>
          </p>
        </Timeline.Item>
      }
      {order.canceledByCompanyAt &&
        <Timeline.Item dot={<FontAwesomeIcon icon={faRectangleXmark} />}>
          <p>
            <Title>
              {EOrderStatusHandler.label(EOrderStatus.CANCELED_BY_COMPANY)}
            </Title>
            <Label>
              {GeneralUtils.localTime(order.canceledByCompanyAt, true)}
            </Label>
          </p>
        </Timeline.Item>
      }
    </CustomTimeline>
  );

  return (
    <List.Item>
      <Panel header={<Header />} collapsible>
        <Panel
          header={
            <>
              <h5>Detalhes do pedido</h5>
              <hr />
            </>
          }
          style={{ backgroundColor: "#fafafa" }}
        >
          <Subtitle>Produtos</Subtitle>
          <Products />

          <Subtitle>Progresso</Subtitle>
          <Progress />

          <Subtitle>Ações</Subtitle>
          {[EOrderStatus.PENDING, EOrderStatus.PREPARING].includes(
            order.status!
          ) && (
            <Button
              appearance="primary"
              color="red"
              startIcon={<BlockIcon />}
              onClick={() => setOpenModal(true)}
            >
              Cancelar pedido
            </Button>
          )}
          <ConfirmModal
            title="Cancelar pedido"
            open={openModal}
            onConfirm={() => onCancel(order)}
            onClose={() => setOpenModal(false)}
            confirmText="Confirmar cancelamento"
            cancelText="Não cancelar"
          >
            Deseja realmente cancelar esta compra?
          </ConfirmModal>
        </Panel>
      </Panel>
    </List.Item>
  );
}
