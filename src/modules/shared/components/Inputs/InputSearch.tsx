import { useState } from "react";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

interface SearchProps {
  loading?: boolean;
  placeholder?: string;
  disableEnter?: boolean;
  options?: any;
  debounce?: number;
  onChange?: (search: string) => void;
  onSearch?: (search: string) => void;
}

export function InputSearch(props: SearchProps) {
  const [search, setSearch] = useState<string>("");
  const [debountId, setDebouceId] = useState<any>(0);
  const {
    debounce,
    disableEnter,
    placeholder,
    options,
    loading,
    onChange,
    onSearch,
  } = props;

  function handleChange(val: string): void {
    setSearch(val);

    if (!onChange) {
      return;
    }

    if (!debounce) {
      onChange(val);
      return;
    }

    clearTimeout(debountId);
    setDebouceId(setTimeout(() => onChange(val), debounce));
  }

  function handleKeyDown(event: any) {
    event.key === "Enter" && !disableEnter && onSearch && onSearch(search);
    setTimeout(() => event.target.focus(), 100);
  }

  return (
    <InputGroup>
      <Input
        size="lg"
        placeholder={placeholder || "Buscar..."}
        value={search}
        onChange={(val) => handleChange(val || "")}
        onKeyDown={handleKeyDown}
        disabled={loading}
        {...(options || {})}
      />
      <InputGroup.Addon
        onClick={() => onSearch && onSearch(search)}
        style={{ cursor: "pointer" }}
      >
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  );
}
