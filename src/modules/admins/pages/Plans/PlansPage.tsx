import {
  InputText,
  PanelBase,
  SaveButton,
} from "src/modules/shared";
import Cards from "react-credit-cards-2";
import { useState } from "react";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Col, FlexboxGrid } from "rsuite";

export default function PlansPage() {
  const [card, setCard] = useState<any>({
    number: "4701322211111234",
    expiry: "12/26",
    cvc: "351",
    name: "Jhon Doe",
    focus: "",
  });

  function handleInputChange(key: string, val: any): void {
    setCard({ ...card, [key]: val });
  }

  function handleInputFocus(key: string): void {
    setCard({ ...card, focus: key });
  }

  return (
    <>
      <PanelBase title="Assinar plano">
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
              expiry={card.expiry}
              cvc={card.cvc}
              name={card.name}
              focused={card.focus}
            />
            <div style={{ height: 20 }}></div>
          </Col>
          <Col xs={24} sm={24} md={11} lg={12} xl={12} xxl={12}>
            <InputText
              label="Número do cartão"
              value={card.number}
              onChange={(val) => handleInputChange("number", val)}
              options={{ onFocus: () => handleInputFocus("number") }}
            />
            <InputText
              label="Nome"
              value={card.name}
              onChange={(val) => handleInputChange("name", val)}
              options={{ onFocus: () => handleInputFocus("name") }}
            />
            <InputText
              label="Data de expiração"
              value={card.expiry}
              onChange={(val) => handleInputChange("expiry", val)}
              options={{ onFocus: () => handleInputFocus("expiry") }}
            />
            <InputText
              label="Código de segurança"
              value={card.cvc}
              onChange={(val) => handleInputChange("cvc", val)}
              options={{ onFocus: () => handleInputFocus("cvc") }}
            />
          </Col>
        </FlexboxGrid>
      </PanelBase>
      <FlexboxGrid justify="end">
        <SaveButton />
      </FlexboxGrid>
    </>
  );
}

export class PlansPageHandler {
  static route(): string {
    return "/admins/plans";
  }
  static navigate(): string {
    return "/admins/plans";
  }
}
