import { Input } from "antd";
import { useState } from "react";

interface SearchProps {
  loading?: boolean,
  placeholder?: string;
  onSearch: (search: string) => void;
}

export function Search(props: SearchProps) {
  const [search, setSearch] = useState<string>('');

  return (
    <Input.Search
      size="large"
      placeholder={props.placeholder || 'Buscar...'}
      enterButton
      value={search}
      onChange={(e) => setSearch(e.target.value || '')}
      onSearch={props.onSearch}
      loading={props.loading}
      disabled={props.loading}
    />
  );
}
