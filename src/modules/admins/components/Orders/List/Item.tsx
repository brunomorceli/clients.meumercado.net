import { FlexboxGrid, Form, List, SelectPicker, Stack } from "rsuite";
import { useState } from "react";
import { IOrderResult } from "@root/modules/admins/interfaces";
import { Label, Title } from "./styles";
import {
  EOrderStatus,
  EOrderStatusHandler,
  FormModal,
  GeneralUtils,
  InputText,
} from "@root/modules/shared";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";

interface OrderListProps {
  order: IOrderResult;
  onPick: (order: IOrderResult) => void;
  onSave: (order: IOrderResult) => void;
}

export function Item(props: OrderListProps) {
  const { order, onPick, onSave } = props;
  const minChars = 20;
  const [error, setError] = useState<any>({});
  const [orderForm, setOrderForm] = useState<IOrderResult | null>(null);

  function handleClose() {
    setOrderForm(null);
    setError({});
  }

  function handleSave(): void {
    if (!orderForm) {
      return;
    }

    const newError: any = {};
    if (!orderForm || orderForm.status === order.status) {
      newError.status = "O status deve ser diferente do status original.";
    }

    if (
      orderForm.status === EOrderStatus.CANCELED_BY_COMPANY &&
      (orderForm.observation || "").length < minChars
    ) {
      newError.observation =
        "Para este tipo de stauts você deve escrever uma observação de pelo menos 20 caracteres";
    }

    setError(newError);

    if (Object.keys(newError).length !== 0) {
      return;
    }

    onSave(orderForm!);
    setOrderForm(null);
    setError({});
  }

  const statusKeys = Object.values(EOrderStatus);
  const currentIndex = statusKeys.indexOf(order.status);
  const canEdit = currentIndex < statusKeys.length -3;

  return (
    <>
      <List.Item>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={4} onClick={() => onPick(order)}>
            <Title>{GeneralUtils.localTime(order.createdAt, true)}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12} onClick={() => onPick(order)}>
            <Title>{order.userName}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} onClick={() => onPick(order)}>
            <Title>{GeneralUtils.getAmountLabel(order.total)}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} onClick={() => canEdit && setOrderForm(order)}>
            <Title>
              <Label
                style={{ color: EOrderStatusHandler.color(order.status!) }}
              >
                {EOrderStatusHandler.label(order.status!)}
                {canEdit &&
                  <>
                    &nbsp;
                    <ArrowDownLineIcon />
                  </>
                }
              </Label>
            </Title>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
      <FormModal
        title="Alterar status"
        open={Boolean(orderForm)}
        onSave={() => handleSave()}
        onClose={handleClose}
        saveText="Salvar"
      >
        {orderForm && (
          <>
            <div>
              <Form.Group style={{ width: "100%",  marginBottom: 40 }}>
                <Form.ControlLabel>Status</Form.ControlLabel>
                <Stack spacing={5} justifyContent="space-between">
                  <Stack.Item>
                    <SelectPicker
                      style={{ width: '100%' }}
                      label="De"
                      searchable={false}
                      cleanable={false}
                      readOnly
                      caretAs={() => null}
                      defaultValue={order.status}
                      data={[
                        {
                          value: order.status,
                          label: EOrderStatusHandler.label(order.status),
                        },
                      ]}
                    />
                  </Stack.Item>
                  <Stack.Item>
                    <SelectPicker
                      style={{ width: '100%' }}
                      label="Para"
                      searchable={false}
                      cleanable={false}
                      defaultValue={statusKeys[currentIndex + 1]}
                      data={[...EOrderStatusHandler.options().slice(currentIndex + 1, statusKeys.length -1)]}
                      onSelect={(status) => setOrderForm({ ...orderForm!, status })}
                    />
                  </Stack.Item>
                </Stack>
                <Form.ErrorMessage show={Boolean(error.status)}>
                  {error.status}
                </Form.ErrorMessage>
              </Form.Group>
            </div>
            <div style={{ marginBottom: 40 }}>
              <InputText
                label={`Observação (${(orderForm.observation || "")!.length})`}
                error={error.observation}
                value={orderForm.observation}
                onChange={(val) =>
                  setOrderForm({ ...orderForm, observation: val || "" })
                }
                options={{ as: "textarea", rows: 5 }}
              />
            </div>
          </>
        )}
      </FormModal>
    </>
  );
}
