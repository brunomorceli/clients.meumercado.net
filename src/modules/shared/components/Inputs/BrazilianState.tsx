import { EBrazilianStateHandler } from "@shared/enums";
import { Form, SelectPicker } from "rsuite";

interface BrazilianStateProps {
  label?: string;
  value?: string;
  error?: string;
  options?: any;
  onChange?: (val: string) => void;
}

export function BrazilianState(props: BrazilianStateProps) {
  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label}</Form.ControlLabel>
      <SelectPicker
        block
        searchable={false}
        cleanable={false}
        data={[
          { label: "Selecione", value: "" },
          ...EBrazilianStateHandler.getSelectOptions(),
        ]}
        onChange={(state: any) => props.onChange && props.onChange(state.value)}
        value={props.value}
        defaultValue={props.value}
        {...props.options || {}}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
