import { useStore } from "zustand";
import { useExternalApiStore } from "@/stores";
import { useEffect, useState } from "react";
import { IFindAddressResult } from "@/interfaces/find-address-result.interface";
import { message } from "antd";
import { Form, InputGroup, MaskedInput } from "rsuite";
import ReloadIcon from '@rsuite/icons/Reload';

interface CepProps {
  value?: string | null | undefined;
  label?: string;
  error?: string;
  onSearch: (address: IFindAddressResult | null) => void;
}

const cache: any = {};
export function Cep(props: CepProps) {
  const externalApiStore = useStore(useExternalApiStore);
  const [value, setValue] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => { setValue(props.value || ''); }, [props.value]);

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
      .catch(message.error)
      .finally(() => setProcessing(false));
  }

  function handleChange(val: string): void {
    const cep = val.replace(/[^0-9]/g, '').trim();
    if (cep.length > 8) {
      return;
    }

    setValue(cep);
    handleSearch(cep);
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.ControlLabel>{props.label || 'CEP'}</Form.ControlLabel>
      <InputGroup>
        <MaskedInput
          disabled={processing}
          mask={[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,/[0-9]/]}
          onChange={(val) => handleChange(val)}
          placeholder="00000-000"
          readOnly={processing}
        />
        {processing &&
          <InputGroup.Addon>
            <ReloadIcon spin />
          </InputGroup.Addon>
        }
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
