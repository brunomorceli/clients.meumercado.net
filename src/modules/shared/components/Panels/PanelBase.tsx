import { ButtonGroup, Divider, Stack } from "rsuite";
import { ReactNode } from "react";
import { PlusButton } from "..";
import { CustomPanel } from "./styles";

interface PanelBaseProps {
  title: string;
  children?: ReactNode | null | undefined;
  onAdd?: () => void;
  actionEl?: ReactNode | null | undefined;
  style?: any;
  hideTitleDivider?: boolean;
}

export function PanelBase(props: PanelBaseProps) {
  const { title, children, hideTitleDivider, onAdd, actionEl } = props;

  const element = actionEl || (
    <ButtonGroup>
      <PlusButton onClick={onAdd} />
    </ButtonGroup>
  );
  return (
    <CustomPanel
      bordered
      shaded
      style={{ ...(props.style || {}) }}
      header={
        <>
          <Stack justifyContent="space-between">
            <h5>{title}</h5>
            {(onAdd || actionEl) && element}
          </Stack>
          {!hideTitleDivider && <Divider />}
        </>
      }
    >
      {children}
    </CustomPanel>
  );
}
