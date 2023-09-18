import { Button } from "rsuite";
import ListIcon from "@rsuite/icons/List";

interface ListButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function ListButton(props: ListButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<ListIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Listar'}
  </Button>
  );
}