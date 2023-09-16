"use client";

import { EMeasureType } from "@/enums";
import { IMeasure } from "@/interfaces";
import { MaskedInput } from "antd-mask-input";
import { FlexboxGrid, Form, InputGroup, SelectPicker } from "rsuite";

interface ProductFormProps {
  measures: IMeasure[];
  onChange: (measure: IMeasure) => void;
}

export function FormMeasures(props: ProductFormProps) {
  return (
    <FlexboxGrid justify="space-between">
      {props.measures.map((item, index) => (
        <FlexboxGrid.Item colspan={5} key={index}>
          {item.type !== EMeasureType.OPTION ? (
            <Form.Group style={{ width: "100%" }}>
              <Form.ControlLabel>{item.label}</Form.ControlLabel>
              <InputGroup>
                <MaskedInput
                  value={`${item.value || ""}`}
                  mask={/^[0-9]+$/}
                  onChange={(e) =>
                    props.onChange({ ...item, value: e.target.value })
                  }
                />
                {item.unitText && (
                  <InputGroup.Addon>{item.unitText}</InputGroup.Addon>
                )}
              </InputGroup>
            </Form.Group>
          ) : (
            <Form.Group style={{ width: "100%" }}>
              <Form.ControlLabel>{item.label}</Form.ControlLabel>
              <InputGroup>
                <SelectPicker
                  value={item.value}
                  onChange={(value) => props.onChange({ ...item, value })}
                  data={item.options}
                  style={{ width: "100%" }}
                  size="sm"
                />
                {item.unitText && (
                  <InputGroup.Addon>{item.unitText}</InputGroup.Addon>
                )}
              </InputGroup>
            </Form.Group>
          )}
        </FlexboxGrid.Item>
      ))}
    </FlexboxGrid>
  );
}
