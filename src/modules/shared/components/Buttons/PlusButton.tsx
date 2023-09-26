import { Button } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

interface PlusButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function PlusButton(props: PlusButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<PlusIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Adicionar'}
  </Button>
  );
}