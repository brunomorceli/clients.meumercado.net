import {
  Button,
  Dropdown,
  FlexboxGrid,
  Form,
  List,
  SelectPicker,
  Stack,
} from "rsuite";
import { useState } from "react";
import { IOrderResult } from "@root/modules/admins/interfaces";
import { Label, Title } from "./styles";
import {
  EOrderStatus,
  EOrderStatusHandler,
  FormModal,
  GeneralUtils,
  InputText,
  WhatsappIcon,
} from "@root/modules/shared";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faPenToSquare,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

interface OrderListProps {
  order: IOrderResult;
  onPick: (order: IOrderResult) => void;
  onClientDetails: (order: IOrderResult) => void;
  onSave: (order: IOrderResult) => void;
}

export function Item(props: OrderListProps) {
  const { order, onPick, onClientDetails, onSave } = props;
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
  const canEdit = currentIndex < statusKeys.length - 3;

  return (
    <>
      <List.Item>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={4} onClick={() => onPick(order)}>
            <Title>{GeneralUtils.localTime(order.createdAt, true)}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} onClick={() => onClientDetails(order)}>
            <Title>{order.userName}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} onClick={() => onPick(order)}>
            <Title>{GeneralUtils.getAmountLabel(order.total)}</Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            colspan={6}
            onClick={() => canEdit && setOrderForm(order)}
          >
            <Title>
              <Label
                style={{ color: EOrderStatusHandler.color(order.status!) }}
              >
                {EOrderStatusHandler.label(order.status!)}
                {canEdit && (
                  <>
                    &nbsp;
                    <ArrowDownLineIcon />
                  </>
                )}
              </Label>
            </Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2}>
            <Dropdown
              noCaret
              placement="bottomEnd"
              title={<FontAwesomeIcon style={{ paddingLeft: 5, paddingRight: 5 }} icon={faEllipsisVertical} />}
            >
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                onClick={() => onPick(order)}
              >

                &nbsp;Detalhes
              </Dropdown.Item>
              {canEdit && (
                <Dropdown.Item
                  icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  onClick={() => setOrderForm(order)}
                >
                  &nbsp;Alterar status
                </Dropdown.Item>
              )}
              {order.phoneNumber &&
                <Dropdown.Item
                  icon={<WhatsappIcon />}
                  onClick={() => window.open(`https://api.whatsapp.com/send/?phone=${order.phoneNumber}&type=phone_number`, '_blank')}
                >
                  &nbsp;Mensagem do Whatsapp
                </Dropdown.Item>
              }
            </Dropdown>
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
              <Form.Group style={{ width: "100%", marginBottom: 40 }}>
                <Form.ControlLabel>Status</Form.ControlLabel>
                <Stack spacing={5} justifyContent="space-between">
                  <Stack.Item>
                    <SelectPicker
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
                      label="Para"
                      searchable={false}
                      cleanable={false}
                      defaultValue={statusKeys[currentIndex + 1]}
                      data={[
                        ...EOrderStatusHandler.options().slice(
                          currentIndex + 1,
                          statusKeys.length - 1
                        ),
                      ]}
                      onSelect={(status) =>
                        setOrderForm({ ...orderForm!, status })
                      }
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
