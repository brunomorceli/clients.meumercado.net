import { Form, Input, InputGroup } from "rsuite";
import MinusIcon from "@rsuite/icons/Minus";
import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { GeneralUtils } from "@shared/utils";

interface InputQuantityProps {
  label?: string;
  value: number;
  showLimit?: boolean;
  options?: any;
  min?: number;
  max?: number;
  step?: number;
  sulfix?: string | null | undefined;
  error?: string | null | undefined;
  actionRemove?: boolean;
  onChange: (value: number) => void;
  onRemove?: () => void;
}

export function InputQuantity(props: InputQuantityProps) {
  const { value } = props;
  const min = props.min || 1;
  const max = props.max || Infinity;
  const step = props.step || 1;
  const sulfix = GeneralUtils.getSulfixLabel(props.sulfix, " ");
  const label = props.showLimit
    ? `${props.label} (${value}${GeneralUtils.getSulfixLabel(max, "/")})`
    : props.label;

  function handleChange(value: number): void {
    props.onChange && props.onChange(GeneralUtils.clamp(value || 0, min, max));
  }

  return (
    <Form.Group style={{ width: "100%" }}>
      {props.label && <Form.ControlLabel>{label}</Form.ControlLabel>}
      <InputGroup>
        {props.onRemove && value === min ? (
          <InputGroup.Addon
            onClick={props.onRemove}
            style={{ cursor: "pointer" }}
          >
            <TrashIcon />
          </InputGroup.Addon>
        ) : (
          <InputGroup.Addon
            onClick={() => handleChange(value - step)}
            style={{ cursor: "pointer" }}
          >
            <MinusIcon />
          </InputGroup.Addon>
        )}
        <Input
          readOnly
          value={`${props.value || ""}${sulfix}`}
          {...(props.options || {})}
        />
        <InputGroup.Addon
          onClick={() => handleChange(value + step)}
          style={{ cursor: "pointer" }}
        >
          <PlusIcon />
        </InputGroup.Addon>
        {props.actionRemove && (
          <InputGroup.Addon
            onClick={props.onRemove}
            style={{ cursor: "pointer" }}
          >
            <TrashIcon />
          </InputGroup.Addon>
        )}
      </InputGroup>
      <Form.ErrorMessage show={Boolean(props.error)}>
        {props.error}
      </Form.ErrorMessage>
    </Form.Group>
  );
}
