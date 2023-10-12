import { List, Panel, Button } from "rsuite";
import { Subtitle } from "./styles";
import { EOrderStatus, FormModal, IOrder, InputText, PanelBase } from "@shared";
import BlockIcon from "@rsuite/icons/Block";
import { useEffect, useState } from "react";
import { Products } from "./Products";
import { Progress } from "./Progress";
import { Order } from "./Order";

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
      setError("");
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

  return (
    <List.Item>
      <Panel header={<Order order={order} />} collapsible>
        <Panel
          header={
            <>
              <h5>Detalhes do pedido</h5>
              <hr />
            </>
          }
          style={{ backgroundColor: "#fafafa" }}
        >
          <PanelBase title="Produtos">
            <Products order={order} />
          </PanelBase>

          <PanelBase title="Progresso">
            <Progress order={order} />

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
          </PanelBase>

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
