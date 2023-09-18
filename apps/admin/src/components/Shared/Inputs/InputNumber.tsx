import { Form, Input } from "rsuite";

interface InputNumberProps {
  label?: string;
  value: any;
  error?: string | null | undefined;
  onChange: (value: number) => void;
}

export function InputNumber(props: InputNumberProps) {
  function handleChange(value: string): void {
    const onlyNumbers = value.replace(/[^0-9]+/g, "");
    props.onChange && props.onChange(Number(onlyNumbers));
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      {props.label && <Form.ControlLabel>{props.label}</Form.ControlLabel>}
      <Input
        value={`${props.value || ""}`}
        onChange={(val) => handleChange(val)}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
