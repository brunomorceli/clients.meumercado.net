import { Button } from "rsuite";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function CartButton(props: CartButtonProps) {
  const options = props.options || {};

  return (
    <Button
      appearance="default"
      startIcon={<FontAwesomeIcon icon={faCartShopping} />}
      onClick={() => props.onClick && props.onClick()}
      {...options}
    >
      {props.title || "Carrinho"}
    </Button>
  );
}
