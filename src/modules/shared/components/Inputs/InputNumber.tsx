import { Form, Input } from "rsuite";

interface InputNumberProps {
  label?: string;
  value: any;
  maxLength?: number;
  options?: any;
  error?: string | null | undefined;
  onChange: (value: number) => void;
}

export function InputNumber(props: InputNumberProps) {
  function handleChange(value: string): void {
    let onlyNumbers = value.replace(/[^0-9]+/g, "");
    if (props.maxLength) {
      onlyNumbers = onlyNumbers.substring(0, props.maxLength);
    }

    props.onChange && props.onChange(Number(onlyNumbers));
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      {props.label && <Form.ControlLabel>{props.label}</Form.ControlLabel>}
      <Input
        value={`${props.value || ""}`}
        onChange={(val) => handleChange(val)}
        {...(props.options || {})}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
