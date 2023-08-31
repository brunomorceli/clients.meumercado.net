import { MaskedInput } from "antd-mask-input";
import { useMemo } from "react";

interface PhoneNumberProps {
  value: string;
  onChange: (val: string) => void;
}

export function PhoneNumber(props: PhoneNumberProps) {
  const cellphoneMask = '(00) 0 0000-0000';
  const phoneMask = '(00) 0000-0000';
  const mask = useMemo(
    () => [
      {
        mask: cellphoneMask,
        lazy: false,
      },
      {
        mask: phoneMask,
        lazy: false,
      },
    ],
    []
  );

  return (
    <MaskedInput
      {...props}
      mask={mask}
      value={props.value}
      onChange={(e) => props.onChange(e.unmaskedValue || '')}
      maskOptions={{
        dispatch: function (appended, dynamicMasked) {
          const isCellPhone = dynamicMasked.unmaskedValue[2] === '9';
          return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
        },
      }}
    />
  );
}
