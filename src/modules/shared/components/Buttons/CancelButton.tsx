import { Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

interface CancelButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function CancelButton(props: CancelButtonProps) {
  const options = props.options || {};

  return (
    <Button
      appearance="default"
      startIcon={<FontAwesomeIcon icon={faBan} />}
      onClick={() => props.onClick && props.onClick()}
      {...options}
    >
      {props.title || "Cancelar"}
    </Button>
  );
}
