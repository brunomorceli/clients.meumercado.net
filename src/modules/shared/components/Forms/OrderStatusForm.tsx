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
import { RadioTile, RadioTileGroup } from "rsuite";

interface OrderStatusFormProps {
  order?: IOrder | IOrderResult | null | undefined;
  minChars?: number;
  onSave: (order: IOrder | IOrderResult) => void;
  onCancel: () => void;
}

export function OrdersStatusForm(props: OrderStatusFormProps) {
  const { onSave, onCancel } = props;
  const [order, setOrder] = useState<IOrder | IOrderResult>(
    IOrderHandler.empty()
  );
  const [initialStatus, setInitialStatus] = useState<EOrderStatus>(
    order.status!
  );
  const statusList = Object.values(EOrderStatus);
  const [error, setError] = useState<any>({});
  const disableIndex = Math.max(statusList.indexOf(initialStatus), 0);

  useEffect(() => {
    if (Boolean(props.order)) {
      setOrder({
        ...props.order!,
        status: getNextStatus(props.order!.status!),
      });

      setInitialStatus(props.order!.status!);
    }
  }, [props.order]);

  function getNextStatus(status?: EOrderStatus): EOrderStatus {
    if (!status) {
      return EOrderStatus.PENDING;
    }

    const index = statusList.indexOf(status);
    const nextIndex = GeneralUtils.clamp(index + 1, 0, statusList.length - 1);

    return statusList[nextIndex];
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
      (order.observation || "").length < (props.minChars || 20)
    ) {
      newError.observation =
        "Para este tipo de stauts você deve escrever uma observação de pelo menos 20 caracteres";
    }

    setError(newError);

    if (Object.keys(newError).length !== 0) {
      return;
    }

    setError({});
    onSave(order);
  }

  return (
    <FormModal
      title="Alterar status"
      open={Boolean(props.order)}
      onSave={handleSave}
      onClose={handleClose}
      saveText="Salvar"
    >
      <RadioTileGroup
        defaultValue={order.status}
        value={order.status}
        aria-label="Status do pedido"
        onChange={(status: any) => setOrder({ ...order, status })}
      >
        {statusList.map((status, index) => (
          <RadioTile
            key={index}
            icon={EOrderStatusHandler.icon(status)}
            label={EOrderStatusHandler.label(status)}
            value={status}
            disabled={index <= disableIndex}
          >
            {EOrderStatusHandler.label(status)}
          </RadioTile>
        ))}
      </RadioTileGroup>
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
