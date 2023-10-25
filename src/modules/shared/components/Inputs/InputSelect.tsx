import { ReactNode } from "react";
import { Form, SelectPicker } from "rsuite";

interface Option {
  label: string | ReactNode;
  value: any;
}
interface InputSelectProps {
  label?: string | null | undefined;
  options: Option[];
  value?: any | null | undefined;
  error?: string | null | undefined;
  onChange?: (value: any) => void;
}

export function InputSelect(props: InputSelectProps) {
  return (
    <Form.Group style={{ width: "100%" }}>
      {props.label && <Form.ControlLabel>{props.label}</Form.ControlLabel>}
      <SelectPicker
        searchable={false}
        cleanable={false}
        style={{ width: "100%" }}
        data={props.options}
        value={props.value}
        defaultValue={props.value}
        onChange={(val) => props.onChange && props.onChange(val)}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
