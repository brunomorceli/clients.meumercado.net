import {
  Button,
} from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import { EField, EFieldHandler } from "./enums";
import { IOption } from "./interfaces/option.interface";

interface SelectedOptionsProps {
  options: IOption[];
  onRemove: (option: IOption) => void;
  onClear: () => void;
}

export function SelectedOptions(props: SelectedOptionsProps) {
  return (
    <>
      {props.options.map((item, index) => (
        <Button
          key={index}
          appearance="ghost"
          color="cyan"
          endIcon={<CloseOutlineIcon />}
          onClick={() => props.onRemove(item)}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          {EFieldHandler.label(item.field)}: {item.search}
        </Button>
      ))}
      {props.options.length !== 0 && (
        <Button
          appearance="ghost"
          color="cyan"
          endIcon={<CloseOutlineIcon />}
          onClick={props.onClear}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          Limpar filtros
        </Button>
      )}
    </>
  );
}
