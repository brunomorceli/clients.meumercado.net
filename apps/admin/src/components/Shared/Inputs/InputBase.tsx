import { Form, Input } from "rsuite";

interface InputBaseProps {
  label?: string;
  value?: string;
  error?: string | null | undefined;
  options?: any;
  onChange?: (value: string) => void;
}

export function InputBase(props: InputBaseProps) {
  return (
    <Form.Group style={{ width: "100%" }}>
      {props.label && <Form.ControlLabel>{props.label}</Form.ControlLabel>}
      <Input
        value={props.value}
        onChange={props.onChange}
        {...props.options || {}}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
