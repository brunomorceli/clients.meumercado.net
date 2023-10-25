import { Form, InputGroup, MaskedInput, Schema } from "rsuite";

export const InputCpfCnpjSchema = Schema.Types.StringType()
  .isRequired("Este campo é obrigatório")
  .addRule((value) => {
    const val = (value || "").replace(/[^0-9]/g, "").trim();

    return val.length === 11 || val.length === 13;
  }, "Formato inválido.");

interface InputCpfCnpjProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  sulfixLabel?: string;
  options?: any;
  onChange?: (value: string) => void;
}

export function InputCpfCnpj(props: InputCpfCnpjProps) {
  const data: any = {
    cpf: {
      label: "CPF",
      placeholder: "000.000.000-00",
      mask: [
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
      ],
    },
    cnpj: {
      label: "CNPJ",
      placeholder: "00.000.000/000-00",
      mask: [
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
      ],
    },
  };

  function handleChange(val: string): void {
    props.onChange && props.onChange(val.replace(/[^0-9]/g, "").trim());
  }

  const key = (props.value || "").length < 12 ? "cpf" : "cnpj";
  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>
        {props.label || data[key].label}
        {props.sulfixLabel || ""}
      </Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          value={props.value}
          mask={data[key].mask}
          onChange={(val) => handleChange(val)}
          guide={false}
          placeholder=""
          {...(props.options || {})}
        />
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
