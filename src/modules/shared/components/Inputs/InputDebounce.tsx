import { useState } from "react";
import { Form, Input } from "rsuite";

interface InputBaseProps {
  label?: string;
  defaultValue?: string;
  debounce?: number;
  error?: string | null | undefined;
  options?: any;
  onChange?: (value: string) => void;
}

export function InputDebounce(props: InputBaseProps) {
  const { defaultValue, debounce, label, options, error, onChange } = props;
  const [value, setValue] = useState<string>(defaultValue || "");
  const [debountId, setDebouceId] = useState<any>(0);

  function handleChange(val: string): void {
    const filtered = (val || '').replace(/\s+$/, ' ');
    if (!onChange) {
      return;
    }

    setValue(filtered);

    if (!debounce) {
      onChange(filtered);
      return;
    }

    clearTimeout(debountId);
    setDebouceId(setTimeout(() => onChange(filtered), debounce));
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      {label && <Form.ControlLabel>{label}</Form.ControlLabel>}
      <Input value={value} onChange={handleChange} {...(options || {})} />
      <Form.ErrorMessage show={Boolean(error)}>{props.error}</Form.ErrorMessage>
    </Form.Group>
  );
}
