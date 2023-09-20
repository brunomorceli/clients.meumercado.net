import { useState } from "react";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

interface SearchProps {
  loading?: boolean;
  placeholder?: string;
  disableEnter?: boolean;
  options?: any;
  onChange?: (search: string) => void;
  onSearch: (search: string) => void;
}

export function Search(props: SearchProps) {
  const [search, setSearch] = useState<string>("");

  function handleChange(val: string): void {
    setSearch(val);
    props.onChange && props.onChange(val);
  }

  function handleKeyDown(event: any) {
    event.key === "Enter" && !props.disableEnter && props.onSearch(search);
    setTimeout(() => event.target.focus(), 100);
  }

  return (
    <InputGroup>
      <Input
        size="lg"
        placeholder={props.placeholder || "Buscar..."}
        value={search}
        onChange={(val) => handleChange(val || "")}
        onKeyDown={handleKeyDown}
        disabled={props.loading}
        {...props.options || {}}
      />
      <InputGroup.Addon
        onClick={() => props.onSearch(search)}
        style={{ cursor: "pointer" }}
      >
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  );
}
