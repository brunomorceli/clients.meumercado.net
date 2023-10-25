import { EOrderStatusHandler } from "@root/modules/shared";
import { SelectPicker } from "rsuite";

interface StatusSelectProps {
  status: string;
  onChange: (status: string) => void;
  onClear: () => void;
}

export function StatusSelect(props: StatusSelectProps) {
  const { status, onChange, onClear } = props;

  return (
    <SelectPicker
      label="Status"
      searchable={false}
      cleanable={status !== "all"}
      value={status}
      data={[
        { label: "Todos", value: "all" },
        ...EOrderStatusHandler.options(),
      ]}
      onSelect={onChange}
      onClean={onClear}
    />
  );
}
