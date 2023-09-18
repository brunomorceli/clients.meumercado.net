import { Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface SaveButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function SaveButton(props: SaveButtonProps) {
  const options = props.options || {};

  return (
    <Button
      appearance="primary"
      onClick={props.onClick}
      startIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
      {...options}
    >
      {props.title || "Salvar"}
    </Button>
  );
}
