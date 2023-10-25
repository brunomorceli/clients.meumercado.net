import { ReactNode } from "react";
import { Col12, Col24, Col6 } from "..";
import { Label, Title } from "./styles";

interface PropertyProps {
  label: string | ReactNode;
  title: string | ReactNode;
  onClick?: () => void;
  onClickLabel?: () => void;
  onClickTitle?: () => void;
  colSize: 6 | 12 | 24;
}

export function Property(props: PropertyProps) {
  const Col = getColElement(props.colSize);

  function getColElement(size: 6 | 12 | 24): any {
    switch(size) {
      case 6:
        return Col6;
      case 12:
        return Col12;
      case 24:
        return Col24;
    }
  }

  return (
    <Col style={{ marginBottom: 10 }}>
      <Label>{props.label}</Label>
      <Title>{props.title}</Title>
    </Col>
  );
}