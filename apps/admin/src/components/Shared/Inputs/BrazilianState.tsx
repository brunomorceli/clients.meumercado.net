import { EBrazilianState, EBrazilianStateHandler } from "@/enums";
import { Select } from "antd";

interface CompanyFormProps {
  value?: EBrazilianState;
  onChange?: (state: EBrazilianState | string) => void;
}

export function CompanyForm(props: CompanyFormProps) {
  return (
    <Select
      options={[
        { label: "Selecione", value: "" },
        ...EBrazilianStateHandler.getSelectOptions(),
      ]}
      onChange={(state) => props.onChange && props.onChange(state)}
      value={props.value || ""}
    />
  );
}
