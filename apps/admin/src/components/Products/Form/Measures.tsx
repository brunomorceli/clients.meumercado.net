"use client";

import { IMeasure } from "@/interfaces";
import {
  Col,
  FlexboxGrid,
  Form,
  Input,
} from "rsuite";

interface ProductFormProps {
  measures: IMeasure[];
  onChange: (measure: IMeasure) => void;
}

export function FormMeasures(props: ProductFormProps) {
  return (
    <FlexboxGrid justify="space-between">
      {props.measures.map((item, index) => (
        <Col xs={12} md={12} lg={6} xl={6} xxl={5} key={index}>
          <Form.Group style={{ width: "100%" }}>
            <Form.ControlLabel>{item.label}</Form.ControlLabel>
              <Input
                value={`${item.value || ""}`}
                onChange={(value) => props.onChange({ ...item, value })}
              />
          </Form.Group>
        </Col>
      ))}
    </FlexboxGrid>
  );
}
