import { EOrderStatusHandler } from "@root/modules/shared";
import { useState } from "react";
import {
  Button,
  FlexboxGrid,
  Input,
  List,
  Popover,
  SelectPicker,
  Stack,
  Whisper,
} from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";

interface SearchProps {}

enum EField {
  name = "name",
  cpfCnpj = "cpfCnpj",
  email = "email",
  product = "product",
}

interface ISelectedField {
  field: EField;
  value: string;
}

function getLabelByField(field: EField): string {
  switch (field) {
    case EField.name:
      return "Nome do cliente";
    case EField.cpfCnpj:
      return "CPF";
    case EField.email:
      return "Email";
    case EField.product:
      return "Nome do produto";
  }
}

export function Search(props: SearchProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedFields, setSelectedFields] = useState<ISelectedField[]>([]);
  const [status, setStatus] = useState<string>("all");

  function handleAddSelectedField(field: EField): void {
    setSelectedFields([...selectedFields, { field, value: search }]);
    setSearch("");
  }

  function handleRemoveField(value: string): void {
    setSelectedFields(selectedFields.filter((sf) => sf.value !== value));
  }

  function handleClearFields(): void {
    setSelectedFields([]);
    setStatus('all');
    setSearch('');
  }

  const availableOptions = Object.values(EField).filter(
    (value) => !selectedFields.some((sf) => sf.field === value)
  );

  return (
    <FlexboxGrid justify="end">
      <FlexboxGrid.Item colspan={24} style={{ marginBottom: 10 }}>
        <Stack spacing={10}>
          <Stack.Item grow={1}>
            <Whisper
              open={search.length >= 3 && availableOptions.length !== 0}
              placement="bottomStart"
              speaker={
                <Popover arrow={false}>
                  <h6>Direcionar busca</h6>
                  <List hover style={{ cursor: "pointer" }}>
                    {availableOptions.map((value, index) => (
                      <List.Item
                        key={index}
                        onClick={() => handleAddSelectedField(value)}
                      >
                        {getLabelByField(value)}: <strong>{search}</strong>
                      </List.Item>
                    ))}
                  </List>
                </Popover>
              }
            >
              <Input value={search} onChange={setSearch} />
            </Whisper>
          </Stack.Item>
          <Stack.Item>
            <SelectPicker
              label="Status"
              searchable={false}
              cleanable={status !== "all"}
              value={status}
              data={[
                { label: "Todos", value: "all" },
                ...EOrderStatusHandler.options(),
              ]}
              onSelect={setStatus}
              onClean={() => setStatus("all")}
            />
          </Stack.Item>
        </Stack>
      </FlexboxGrid.Item>
      {selectedFields.map((item, index) => (
        <Button
          key={index}
          appearance="ghost"
          color="cyan"
          endIcon={<CloseOutlineIcon />}
          onClick={() => handleRemoveField(item.value)}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          {getLabelByField(item.field)}: {item.value}
        </Button>
      ))}
      {selectedFields.length !== 0 &&
        <Button
          appearance="ghost"
          color="cyan"
          endIcon={<CloseOutlineIcon />}
          onClick={handleClearFields}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          Limpar filtros
        </Button>
      }
    </FlexboxGrid>
  );
}
