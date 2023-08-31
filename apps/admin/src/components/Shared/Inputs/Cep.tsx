import { useStore } from "zustand";
import { useExternalApiStore } from "@/stores";
import { useEffect, useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { IFindAddressResult, IFindAddressResultHandler } from "@/interfaces/find-address-result.interface";
import { message } from "antd";

interface CepProps {
  value?: string | null | undefined;
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

    setProcessing(false);

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
    if (val.length > 8) {
      return;
    }

    setValue(val);
    handleSearch(val);
  }

  return (
    <MaskedInput
      disabled={processing}
      mask={'00000-000'}
      onChange={(e: any) => handleChange(e.unmaskedValue || '')}
    />
  );
}
