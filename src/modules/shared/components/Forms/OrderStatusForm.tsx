import { IOrderResult } from "src/modules/admins/interfaces";
import {
  EOrderStatus,
  EOrderStatusHandler,
  FormModal,
  GeneralUtils,
  IOrder,
  IOrderHandler,
  InputText,
} from "src/modules/shared";

import { useEffect, useState } from "react";
import { FlexboxGrid, Form, SelectPicker } from "rsuite";

interface OrderStatusFormProps {
  order?: IOrder | IOrderResult | null | undefined;
  onSave: (order: IOrder | IOrderResult) => void;
  onCancel: () => void;
}

export function OrdersStatusForm(props: OrderStatusFormProps) {
  const { onSave, onCancel } = props;
  const [order, setOrder] = useState<IOrder | IOrderResult>(
    IOrderHandler.empty()
  );
  const statusKeys = Object.values(EOrderStatus);
  const [error, setError] = useState<any>({});
  const minChars = 20;

  useEffect(() => {
    if (Boolean(props.order)) {
      setOrder({
        ...props.order!,
        status: getNextStatus(props.order!.status!),
      });
    }
  }, [props.order]);

  function getNextStatus(status?: EOrderStatus): EOrderStatus {
    if (!status) {
      return EOrderStatus.PENDING;
    }

    const index = statusKeys.indexOf(status);
    const nextIndex = GeneralUtils.clamp(index + 1, 0, statusKeys.length - 1);

    return statusKeys[nextIndex];
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
                defaultValue={
                  props.order ? props.order.status! : EOrderStatus.PENDING
                }
                data={[
                  {
                    value: props.order
                      ? props.order.status
                      : EOrderStatus.PENDING,
                    label: EOrderStatusHandler.label(
                      props.order ? props.order.status! : EOrderStatus.PENDING
                    ),
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
                defaultValue={order.status}
                value={order.status}
                data={[
                  ...EOrderStatusHandler.options().slice(
                    statusKeys.indexOf(order.status!),
                    statusKeys.length
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
