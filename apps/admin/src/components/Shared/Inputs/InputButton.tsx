import { Form, IconButton, Input, InputGroup } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";

interface InputButtonProps {
  label?: string;
  value?: any;
  error?: string | null | undefined;
  onChange?: (value: string) => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function InputButton(props: InputButtonProps) {
  return (
    <Form.Group>
      {props.label && <Form.ControlLabel>{props.label}</Form.ControlLabel>}
      <InputGroup>
        <Input
          value={props.value}
          onChange={(value) => props.onChange && props.onChange(value)}
          size="sm"
        />
        <InputGroup.Addon>
          {props.onEdit && (
            <IconButton icon={<EditIcon />} size="sm" onClick={props.onEdit} />
          )}
          {props.onRemove && (
            <IconButton
              icon={<TrashIcon />}
              size="sm"
              onClick={props.onRemove}
            />
          )}
        </InputGroup.Addon>
        <Form.ErrorMessage show={Boolean(props.error)}>
          {props.error}
        </Form.ErrorMessage>
      </InputGroup>
    </Form.Group>
  );
}
