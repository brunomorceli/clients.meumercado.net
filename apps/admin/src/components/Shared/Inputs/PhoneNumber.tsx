import { Form, InputGroup, MaskedInput } from "rsuite";

interface PhoneNumberProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  options?: any;
  onChange?: (value: string) => void;
}
export function PhoneNumber(props: PhoneNumberProps) {
  function handleChange(val: string): void {
    props.onChange && props.onChange(val.replace(/[^0-9]/g, '').trim())
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label || 'Telefone'}</Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          mask={['(',/[0-9]/,/[0-9]/,')', ' ', /[0-9]/, ' ', /[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/, '-' ,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]}
          onChange={(val) => handleChange(val)}
          placeholder="(00) 0 0000-0000"
          {...props.options || {}}
        />
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
