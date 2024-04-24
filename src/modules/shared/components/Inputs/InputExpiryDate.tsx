import { Form, InputGroup, MaskedInput, Schema } from "rsuite";

export const InputExpiryDateSchema = Schema.Types.StringType()
  .isRequired("Este campo é obrigatório")
  .addRule((value) => {
    if (!value || value.replace(/[^0-9]/g, "").trim().length !== 4) {
      return false;
    }

    const parts = value.split("/");
    const month = Number(parts[0]);
    const day = Number(parts[1]);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    return true;
  }, "Formato inválido.");

interface InputExpiryDateProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  options?: any;
  onChange?: (value: string) => void;
}

export function InputExpiryDate(props: InputExpiryDateProps) {
  const { value, label, error, options, onChange } = props;
  const mask = [/[0-9]/, /[0-9]/, "/", /[0-9]/, /[0-9]/];

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          value={value}
          mask={mask}
          onChange={(val) => onChange && onChange(val || "")}
          placeholder="ex: 00/00"
          {...(options || {})}
        />
      </InputGroup>
      <Form.ErrorMessage show={Boolean(error)}>{error}</Form.ErrorMessage>
    </Form.Group>
  );
}
