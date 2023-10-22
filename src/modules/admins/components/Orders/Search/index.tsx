import { useState } from "react";
import { FlexboxGrid, Stack } from "rsuite";
import { EField, EFieldHandler } from "./enums";
import { IOption } from "./interfaces/option.interface";
import { Searchbar } from "./Searchbar";
import { SelectedOptions } from "./SelectedOptions";
import { StatusSelect } from "./StatusSelect";
import { IFindOrder } from "@root/modules/admins/interfaces/find-order.interface";

interface SearchProps {
  onSearch: (search: IFindOrder) => void;
}

export function Search(props: SearchProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const options = Object.values(EField).map((field) => ({
    field,
    label: EFieldHandler.label(field),
    search: "",
  }));
  const [status, setStatus] = useState<string>("all");

  function handleRemoveField(option: IOption): void {
    setSelectedOptions(
      selectedOptions.filter((sf) => sf.field !== option.field)
    );
  }

  function handleClearFields(): void {
    setSelectedOptions([]);
    setStatus("all");
    setSearch("");
  }

  function handleSearch() {
    const findOder: IFindOrder = {};

    for (let i in selectedOptions) {
      const option = selectedOptions[i];
      findOder[option.field] = option.search;
    }

    if (status !== 'all') {
      findOder.status = status as any;
    }

    props.onSearch(findOder);
  }

  const availableOptions = options.filter(
    (o) => !selectedOptions.some((so) => so.field === o.field)
  );

  return (
    <FlexboxGrid justify="end">
      <FlexboxGrid.Item colspan={24} style={{ marginBottom: 10 }}>
        <Stack spacing={10}>
          <Stack.Item grow={1}>
            <Searchbar
              options={availableOptions}
              search={search}
              onChange={setSearch}
              onSearch={handleSearch}
              onSelectOption={(o) =>
                setSelectedOptions([...selectedOptions, o])
              }
            />
          </Stack.Item>
          <Stack.Item>
            <StatusSelect
              status={status}
              onChange={setStatus}
              onClear={() => setStatus("all")}
            />
          </Stack.Item>
        </Stack>
      </FlexboxGrid.Item>
      <SelectedOptions
        options={selectedOptions}
        onRemove={handleRemoveField}
        onClear={handleClearFields}
      />
    </FlexboxGrid>
  );
}
