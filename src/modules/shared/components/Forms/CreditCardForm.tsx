import { Col, FlexboxGrid, Schema } from "rsuite";
import {
  InputCpfCnpj,
  InputCpfCnpjSchema,
  InputExpiryDate,
  InputExpiryDateSchema,
  InputNumber,
  InputText,
} from "..";
import { useState } from "react";
import { ICreditCard } from "../../interfaces";
import Cards from "react-credit-cards-2";

import "react-credit-cards-2/dist/es/styles-compiled.css";

interface CreditCardFormProps {
  card: ICreditCard;
  error: any;
  onChange: (data: ICreditCard) => void;
}

export const CreditCardFormSchema = {
  holderName: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .containsLetterOnly()
    .minLength(3, "O campo deve ter pelo menos 3 caracteres"),

  cardNumber: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .rangeLength(13, 16, "Este campo deve conter entre 13 e 16 caracteres."),

  expiry: InputExpiryDateSchema,

  cvv: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "O campo deve ter pelo menos 3 caracteres"),

  holderDocument: InputCpfCnpjSchema,
};

export function CreditCardForm(props: CreditCardFormProps) {
  const { card, onChange } = props;
  const error = props.error || {};
  const [focus, setFocus] = useState<"name" | "number" | "expiry" | "cvc" | "">(
    ""
  );

  function handleChange(key: string, val: any): void {
    onChange && onChange({ ...card, [key]: val });
  }

  return (
    <FlexboxGrid justify="start">
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        style={{ alignContent: "left" }}
      >
        <Cards
          number={card.cardNumber}
          expiry={card.expiryDate}
          cvc={card.cvv}
          name={card.holderName}
          focused={focus}
        />
        <div style={{ height: 20 }}></div>
      </Col>
      <Col xs={24} sm={24} md={11} lg={12} xl={12} xxl={12}>
        <InputNumber
          label="Número do cartão"
          value={card.cardNumber}
          onChange={(val) => handleChange("cardNumber", val)}
          options={{ onFocus: () => setFocus("number") }}
        />
        <InputText
          label="Nome"
          value={card.holderName}
          onChange={(val) => handleChange("holderName", val)}
          options={{ onFocus: () => setFocus("name") }}
        />
        <InputExpiryDate
          label="Data de expiração"
          value={card.expiryDate}
          error={error.expiry}
          onChange={(val: any) => handleChange("expiryDate", val)}
          options={{ onFocus: () => setFocus("expiry") }}
        />
        <InputNumber
          label="Código de segurança"
          value={card.cvv}
          maxLength={3}
          onChange={(val) => handleChange("cvv", val)}
          options={{ onFocus: () => setFocus("cvc") }}
        />
        <InputCpfCnpj
          label="CPF/CNPJ"
          value={card.holderDocument}
          onChange={(val) => handleChange("holderDocument", val)}
          options={{ onFocus: () => setFocus("") }}
        />
      </Col>
    </FlexboxGrid>
  );
}
