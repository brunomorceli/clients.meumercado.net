import { Button } from "rsuite";
import MinusIcon from "@rsuite/icons/Minus";

interface MinusButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function MinusButton(props: MinusButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<MinusIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Remover'}
  </Button>
  );
}