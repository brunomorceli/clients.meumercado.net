import {
  EOrderStatus,
  EOrderStatusHandler,
  FormModal,
  GeneralUtils,
  IOrder,
  IOrderHandler,
  InputText,
} from "@root/modules/shared";
import { useEffect, useState } from "react";
import { FlexboxGrid, Form, SelectPicker } from "rsuite";

interface OrderStatusFormProps {
  order?: IOrder | null | undefined;
  onSave: (order: IOrder) => void;
  onCancel: () => void;
}

export function OrdersStatusForm(props: OrderStatusFormProps) {
  const { onSave, onCancel } = props;
  const [order, setOrder] = useState<IOrder>(IOrderHandler.empty());
  const statusKeys = Object.values(EOrderStatus);
  const [error, setError] = useState<any>({});
  const minChars = 20;

  useEffect(() => {
    props.order && setOrder(props.order);
  }, [props.order]);

  function clampStatusIndex(status?: EOrderStatus): number {
    if (!status) {
      return 0;
    }

    return GeneralUtils.clamp(
      statusKeys.indexOf(status!),
      0,
      statusKeys.length - 1
    );
  }

  function handleClose() {
    setError({});
    onCancel();
  }

  function handleSave(): void {
    if (!order) {
      return;
    }

    const newError: any = {};
    if (!props.order || props.order.status === order.status) {
      newError.status = "O status deve ser diferente do status original.";
    }

    if (
      [
        EOrderStatus.CANCELED_BY_COMPANY,
        EOrderStatus.CANCELED_BY_COMPANY,
      ].includes(order.status!) &&
      (order.observation || "").length < minChars
    ) {
      newError.observation =
        "Para este tipo de stauts você deve escrever uma observação de pelo menos 20 caracteres";
    }

    setError(newError);

    if (Object.keys(newError).length !== 0) {
      return;
    }

    setError({});
    onSave(order!);
  }

  const currentIndex = clampStatusIndex(props.order ? props.order.status! : EOrderStatus.PENDING);
  return (
    <FormModal
      title="Alterar status"
      open={Boolean(props.order)}
      onSave={handleSave}
      onClose={handleClose}
      saveText="Salvar"
    >
      <>
        <Form.Group style={{ width: "100%", marginBottom: 40 }}>
          <Form.ControlLabel>Status</Form.ControlLabel>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item style={{ width: "calc(50% - 5px)" }}>
              <SelectPicker
                style={{ width: "100%" }}
                label="De"
                searchable={false}
                cleanable={false}
                readOnly
                block
                caretAs={() => null}
                defaultValue={order.status}
                data={[
                  {
                    value: order.status,
                    label: EOrderStatusHandler.label(order.status!),
                  },
                ]}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item style={{ width: "calc(50% - 5px)" }}>
              <SelectPicker
                style={{ width: "100%" }}
                label="Para"
                searchable={false}
                cleanable={false}
                block
                defaultValue={currentIndex + 1}
                data={[
                  ...EOrderStatusHandler.options().slice(
                    currentIndex + 1,
                    statusKeys.length - 1
                  ),
                ]}
                onSelect={(status) => setOrder({ ...order!, status })}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Form.ErrorMessage show={Boolean(error.status)}>
            {error.status}
          </Form.ErrorMessage>
        </Form.Group>
      </>
      <div style={{ marginBottom: 40 }}>
        <InputText
          label={`Observação (${(order.observation || "")!.length})`}
          error={error.observation}
          value={order.observation}
          onChange={(val) => setOrder({ ...order, observation: val || "" })}
          options={{ as: "textarea", rows: 5 }}
        />
      </div>
    </FormModal>
  );
}
