import { Form, InputGroup, MaskedInput, Schema } from "rsuite";

export const InputPhoneNumberSchema = {
  phoneNumber: Schema.Types
  .StringType()
  .minLength(11, "Telefone Inválido"),
};

interface InputPhoneNumberProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  options?: any;
  onChange?: (value: string) => void;
}

export function InputPhoneNumber(props: InputPhoneNumberProps) {
  function handleChange(val: string): void {
    props.onChange && props.onChange(val.replace(/[^0-9]/g, "").trim());
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label || "Telefone"}</Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          value={props.value}
          mask={[
            "(",
            /[0-9]/,
            /[0-9]/,
            ")",
            " ",
            /[0-9]/,
            " ",
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            "-",
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
          ]}
          onChange={(val) => handleChange(val)}
          placeholder="(00) 0 0000-0000"
          {...(props.options || {})}
        />
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
