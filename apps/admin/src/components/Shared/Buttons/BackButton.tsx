import { Button } from "rsuite";
import PagePreviousIcon  from "@rsuite/icons/PagePrevious";

interface BackButtonProps {
  title?: string;
  onClick?: () => void;
  options?: any;
}

export function BackButton(props: BackButtonProps) {
  const options = props.options || {};

  return(
    <Button
    appearance="default"
    startIcon={<PagePreviousIcon />}
    onClick={() => props.onClick && props.onClick()}
    {...options}
  >
    {props.title || 'Voltar'}
  </Button>
  );
}