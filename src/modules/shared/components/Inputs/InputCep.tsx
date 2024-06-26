import { useStore } from "zustand";
import {
  useExternalApiStore,
  useToasterStore,
} from "src/modules/shared/stores";
import { useState } from "react";
import { IFindAddressResult } from "src/modules/shared/interfaces/find-address-result.interface";
import { Form, InputGroup, MaskedInput, Schema } from "rsuite";
import ReloadIcon from "@rsuite/icons/Reload";

export const InputCepSchema = Schema.Types.StringType()
  .isRequired("Este campo é obrigatório.")
  .minLength(8, "CEP incompleto.")
  .addRule(
    (_val, data) => Boolean(data.address && data.address.length > 0),
    "CEP inválido! Por favor, verifique o número."
  );

interface InputCepProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  disabled?: boolean;
  onChange: (cep: string) => void;
  onSearch: (address: IFindAddressResult | null) => void;
}

const cache: any = {};
export function InputCep(props: InputCepProps) {
  const externalApiStore = useStore(useExternalApiStore);
  const toasterStore = useStore(useToasterStore);
  const [processing, setProcessing] = useState<boolean>(false);

  function handleSearch(cep: string): void {
    if (cep.length !== 8) {
      return;
    }

    if (cache[cep]) {
      props.onSearch(cache[cep]);
      return;
    }

    setProcessing(true);

    externalApiStore
      .findAddress(cep)
      .then((res) => {
        cache[cep] = res;
        props.onSearch(res);
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleChange(val: string): void {
    const cep = val.replace(/[^0-9]/g, "").trim();
    if (cep.length > 8) {
      return;
    }

    props.onChange(cep);
    handleSearch(cep);
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label || "CEP"}</Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          value={props.value || ""}
          disabled={processing || props.disabled}
          mask={[
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            "-",
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
          ]}
          onChange={(val) => handleChange(val)}
          placeholder="00000-000"
        />
        {processing && (
          <InputGroup.Addon>
            <ReloadIcon spin />
          </InputGroup.Addon>
        )}
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
