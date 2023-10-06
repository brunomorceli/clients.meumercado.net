import { InputSelect, InputText } from "../Inputs";
import { IOrderPayment } from "../../interfaces";
import { ECreditCardType, EPaymentMethod } from "../..";
import { Col, FlexboxGrid } from "rsuite";

interface PaymentMethodProps {
  payment: IOrderPayment;
  error?: any | null | undefined;
  onChange: (payment: IOrderPayment) => void;
}

export function PaymentMethodForm(props: PaymentMethodProps) {
  const { payment, onChange } = props;

  function handleChangeKey(key: string, value: any): void {
    onChange({ ...payment, [key]: value });
  }

  return (
    <FlexboxGrid justify="space-between">
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 20 }}>
        <InputSelect
          label="Método de pagamento"
          options={[
            { label: "Dinheiro", value: EPaymentMethod.CASH },
            { label: "PIX", value: EPaymentMethod.PIX },
            { label: "Cartão", value: EPaymentMethod.CREDIT_CARD },
            { label: "Crédito (Fiado)", value: EPaymentMethod.CREDIT },
          ]}
          value={payment.method}
          onChange={(val) => handleChangeKey("method", val)}
        />
      </Col>
      {payment.method === EPaymentMethod.CREDIT_CARD && (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 20 }}>
          <InputSelect
            label="Tipo de cartão"
            options={[
              { label: "Débito", value: ECreditCardType.DEBIT },
              { label: "Crédito", value: ECreditCardType.CREDIT },
            ]}
            value={payment.creditCardType}
            onChange={(val) => handleChangeKey("creditCardType", val)}
          />
        </Col>
      )}
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 20 }}>
        <InputText
          label={`Observação (${payment.observation?.length || 0}/${256})`}
          value={payment.observation || ""}
          error={props.error && props.error.observation}
          options={{ as: "textarea", rows: 5 }}
          onChange={(value) =>
            handleChangeKey("observation", value.substring(0, 256))
          }
        />
      </Col>
    </FlexboxGrid>
  );
}
