import { Button } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";

interface TrashButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function TrashButton(props: TrashButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<TrashIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Remover'}
  </Button>
  );
}