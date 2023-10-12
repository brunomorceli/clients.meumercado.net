import { FlexboxGrid, List, Panel, Button, Timeline } from "rsuite";
import { CustomTimeline, Label, Subtitle, Title } from "./styles";
import {
  EOrderStatus,
  EOrderStatusHandler,
  FormModal,
  GeneralUtils,
  IOrder,
  InputText,
} from "@shared";
import BlockIcon from "@rsuite/icons/Block";
import { useEffect, useState } from "react";

interface OrderListProps {
  order: IOrder;
  onCancel: (order: IOrder, observation: string) => void;
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
  const [observation, setObservation] = useState<string>("");
  const minChars = 20;
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (observation.length > 0 && observation.length < minChars) {
      setError("A observação deve conter pelo menos 20 caracteres");
    } else {
      setError('');
    }
  }, [observation]);

  function resetForm() {
    setObservation("");
    setError("");
  }

  function handleClose(): void {
    setOpenModal(false);
    resetForm();
  }

  function handleSave(): void {
    if (!observation || observation.length < minChars) {
      setError("A observação deve conter pelo menos 20 caracteres");
      return;
    }

    onCancel(order, observation);
    setOpenModal(false);
    resetForm();
  }

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
      {order.orderLogs.map((ol, index) => (
        <Timeline.Item key={index} dot={EOrderStatusHandler.icon(ol.status)}>
          <p>
            <Title>{EOrderStatusHandler.label(ol.status)}</Title>
            <Label>{GeneralUtils.localTime(ol.createdAt, true)}</Label>
          </p>
        </Timeline.Item>
      ))}
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

          
          {[EOrderStatus.PENDING, EOrderStatus.PREPARING].includes(
            order.status!
          ) && (
            <>
              <Subtitle>Ações</Subtitle>
              <Button
                appearance="primary"
                color="red"
                startIcon={<BlockIcon />}
                onClick={() => setOpenModal(true)}
              >
                Cancelar pedido
              </Button>
            </>
          )}
          <FormModal
            title="Cancelar pedido"
            open={openModal}
            onSave={handleSave}
            onClose={handleClose}
            saveText="Confirmar cancelamento"
          >
            <div style={{ marginBottom: 40 }}>
              <InputText
                label={`Observação (${observation.length})`}
                error={error}
                onChange={setObservation}
                options={{ as: "textarea", rows: 5 }}
              />
            </div>
          </FormModal>
        </Panel>
      </Panel>
    </List.Item>
  );
}
