import { useState } from "react";
import { InputDebounce, useToasterStore } from "../..";
import { useStore } from "zustand";
import { SelectPicker, Stack } from "rsuite";

interface InputAsyncSearchProps {
  filters: { label: string; value: any }[];
  placeholder?: string;
  debounce?: number;
  asyncContext: (search: string, filter: any) => Promise<any>;
  onResult: (asyncContextResult: any) => void;
}

const cache: any = {};
export function InputAsyncSearch(props: InputAsyncSearchProps) {
  const toasterStore = useStore(useToasterStore);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<any>(props.filters?.[0].value);
  const [searchError, setSearchError] = useState<string | null>(null);

  function handleAsyncContext(text: string) {
    const val = (text || "").trim();
    let error = null;
    if (val.length !== 0 && val.length < 3) {
      error = "O campo deve conter pelo menos 3 letras";
    }

    setSearch(text || "");
    setSearchError(error);

    if (error || val.length === 0) {
      return;
    }

    const cacheKey = `${filter}@${text}`;

    if (cache[cacheKey]) {
      props.onResult(cache[cacheKey]);
      return;
    }

    props
      .asyncContext(text, filter)
      .then((result) => {
        cache[cacheKey] = result;
        props.onResult(result);
      })
      .catch(toasterStore.error);
  }

  return (
    <Stack alignItems="flex-start">
      <Stack.Item grow={1}>
        <InputDebounce
          debounce={props.debounce || 300}
          options={{ placeholder: props.placeholder }}
          error={searchError}
          onChange={handleAsyncContext}
        />
      </Stack.Item>
      <Stack.Item style={{ marginLeft: 10 }}>
        <SelectPicker
          searchable={false}
          cleanable={false}
          data={props.filters}
          value={filter}
          defaultValue={filter}
          onChange={(val: any) => val && setFilter(val)}
        />
      </Stack.Item>
    </Stack>
  );
}
