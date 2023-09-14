"use client";

import { EProductMeasureType, IProductMesarure } from "@/interfaces";
import { MaskedInput } from "antd-mask-input";
import { FlexboxGrid, Form, SelectPicker } from "rsuite";

interface ProductFormProps {
  measures: IProductMesarure[];
  onChange: (measures: IProductMesarure[]) => void;
}

export function Measures(props: ProductFormProps) {
  const { measures, onChange } = props;

  function handleChange(index: number, value: any): void {
    let newList = [...measures];
    newList[index] = {...newList[index], value };

    onChange(newList);
  }

  return (
    <FlexboxGrid justify="space-between">
      {measures.map((item, index) => (
        <FlexboxGrid.Item colspan={5} key={index}>
          {item.type !== EProductMeasureType.OPTION ? (
            <Form.Group style={{ width: "100%" }}>
              <Form.ControlLabel>{item.label}</Form.ControlLabel>
              <MaskedInput
                  value={`${item.value || ''}`}
                  mask={/^[0-9]+$/}
                  onChange={(e) => handleChange(index, Number(e.target.value))}
                />
            </Form.Group>
          ) : (
            <Form.Group style={{ width: "100%" }}>
              <Form.ControlLabel>{item.label}</Form.ControlLabel>
              <SelectPicker
                defaultValue={item.value}
                onChange={(e) => handleChange(index, e)}
                data={item.options.map((i) => ({ label: i, value: i }))}
                style={{ width: '100%' }}
                size="sm"
              />
            </Form.Group>
          )}
        </FlexboxGrid.Item>
      ))}
    </FlexboxGrid>
  );
}
