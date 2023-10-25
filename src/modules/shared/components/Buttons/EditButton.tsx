import { Button } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

interface EditButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function EditButton(props: EditButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<EditIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Editar'}
  </Button>
  );
}