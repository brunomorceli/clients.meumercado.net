/*import { Col, Dropdown, FlexboxGrid, Schema } from "rsuite";
import { InputText } from "..";
import { useState } from "react";
import { ICreditCard, ICreditCardHandler } from "../../interfaces";
import Cards from "react-credit-cards-2";

interface CreditCardFormProps {
  data: any;
  error: any;
  onChange: (data: ICreditCard) => void;
}

export const CreditCardFormSchema = {
  holdName: Schema.Types.StringType().isRequired("Este campo é obrigatório.")
  .minLength(3, "O campo deve ter pelo menos 3 caracteres."),
  number: Schema.Types.StringType().containsLetterOnly() isRequired("Este campo é obrigatório.")
  .minLength(3, "O campo deve ter pelo menos 3 caracteres.")
  .addRule(
    (_val, data) => Boolean(data.address && data.address.length > 0),
    "CEP inválido! Por favor, verifique o número."
  ),

  
  //number: string;
  //expMonth?: number;
  //expYear?: number;
  //cvv: string;
  //holderName: string;
  
};

export function CreditCardForm(props: CreditCardFormProps) {
  const [focus, setFocus] = useState<string>('');
  const [card, setCard] = useState<ICreditCard>(ICreditCardHandler.empty());

  function handleInputChange(key: string, val: any): void {
    setCard({ ...card, [key]: val });
  }

  function getYears(yearAhead=20) {
    let list = [
      Number(new Date().getFullYear().toString().substring(2))
    ];

    for (let i = 1; i-1 < yearAhead; i++) {
      list.push(list[0] + i);
    }
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
          number={card.number}
          expiry={card.expMonth}
          cvc={card.cvv}
          name={card.holderName}
          focused={focus}
        />
        <div style={{ height: 20 }}></div>
      </Col>
      <Col xs={24} sm={24} md={11} lg={12} xl={12} xxl={12}>
        <InputText
          label="Número do cartão"
          value={card.number}
          onChange={(val) => handleInputChange("number", val)}
          options={{ onFocus: () => setFocus("number") }}
        />
        <InputText
          label="Nome"
          value={card.holderName}
          onChange={(val) => handleInputChange("name", val)}
          options={{ onFocus: () => setFocus("name") }}
        />


      <Dropdown
        appearance="default"
        title="Mês de expiração"
        placement='bottomStart'
      >
        <Dropdown.Item key={1}></Dropdown.Item>
        <Dropdown.Item key={2}></Dropdown.Item>
        <Dropdown.Item key={3}></Dropdown.Item>
        <Dropdown.Item key={4}></Dropdown.Item>
        <Dropdown.Item key={5}></Dropdown.Item>
        <Dropdown.Item key={6}></Dropdown.Item>
        <Dropdown.Item key={7}></Dropdown.Item>
        <Dropdown.Item key={8}></Dropdown.Item>
        <Dropdown.Item key={9}></Dropdown.Item>
        <Dropdown.Item key={10}></Dropdown.Item>
        <Dropdown.Item key={11}></Dropdown.Item>
        <Dropdown.Item key={12}></Dropdown.Item>
      </Dropdown>
        <InputText
          label="Código de segurança"
          value={card.cvc}
          onChange={(val) => handleInputChange("cvc", val)}
          options={{ onFocus: () => setFocus("cvc") }}
        />
      </Col>
    </FlexboxGrid>
  );
}
*/

export function CreditCardForm() {
  return (null);
}