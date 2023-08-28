import { Input } from "antd";
import { useEffect, useState } from "react";

interface CurrencyProps {
  cents: number;
  placeholder?: string;
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

  function handleChange(event: any): void {
    const onlyNumbers = (event.target.value || "").replace(/[^0-9]*/g, "");
    const cents = parseInt(onlyNumbers.length !== 0 ? onlyNumbers : 0, 10);

    props.onChange(cents);
  }

  return (
    <Input
      value={label}
      onChange={handleChange}
      placeholder={props.placeholder || ""}
    />
  );
}
