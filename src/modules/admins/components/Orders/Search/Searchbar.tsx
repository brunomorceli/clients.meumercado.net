import { Input, InputGroup, List, Popover, Whisper } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { IOption } from "./interfaces/option.interface";

interface SearchbarProps {
  search: string;
  options: IOption[];
  onChange: (search: string) => void;
  onSearch: (search: string) => void;
  onSelectOption: (option: IOption) => void;
}

export function Searchbar(props: SearchbarProps) {
  const { search, options, onChange, onSearch, onSelectOption } = props;

  function handleKeyDown(event: any) {
    event.key === "Enter" && onSearch(search);
  }

  function handleSelectOption(option: IOption): void {
    onSelectOption({ ...option, search });
    onChange("");
  }

  return (
    <Whisper
      open={search.length >= 2 && options.length !== 0}
      placement="bottomStart"
      speaker={
        <Popover arrow={false}>
          <h6>Direcionar busca</h6>
          <List hover style={{ cursor: "pointer" }}>
            {options.map((item, index) => (
              <List.Item key={index} onClick={() => handleSelectOption(item)}>
                {item.icon ? (
                  <div style={{ marginRight: 10 }}>{item.icon}</div>
                ) : null}
                {item.label}: <strong>{search}</strong>
              </List.Item>
            ))}
          </List>
        </Popover>
      }
    >
      <InputGroup>
        <Input
          placeholder="Buscar pedido..."
          value={search}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <InputGroup.Button onClick={() => onSearch(search)}>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </Whisper>
  );
}
