import { useEffect, useState } from "react";
import { Form, Input } from "rsuite";

interface CurrencyProps {
  label: string;
  cents: number;
  placeholder?: string;
  error?: string;
  onChange: (cents: number) => void;
}

interface MaskedValues {
  cents: number;
  label: string;
}

const formatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function Currency(props: CurrencyProps) {
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    setLabel(getMaskedValues(props.cents).label);
  }, [props.cents]);

  function getMaskedValues(cents?: number): MaskedValues {
    return {
      cents: cents || 0,
      label: cents && cents > 0 ? formatter.format(cents / 100) : "",
    };
  }

  function handleChange(value: string): void {
    const onlyNumbers = (value || "").replace(/[^0-9]*/g, "");
    const cents = Number(onlyNumbers.length !== 0 ? onlyNumbers : '0');

    props.onChange(cents);
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label}</Form.ControlLabel>
      <Input
        value={label}
        onChange={handleChange}
        placeholder={props.placeholder || ""}
      />
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
