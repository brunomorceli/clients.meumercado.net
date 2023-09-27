import { Tooltip, Whisper } from "rsuite";

interface TooltipHoverProps {
  title: string;
  children: any;
}

export function TooltipHover(props: TooltipHoverProps) {
  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={<Tooltip>{props.title}</Tooltip>}
    >
      {props.children}
    </Whisper>
  );
}