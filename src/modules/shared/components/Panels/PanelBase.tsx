import { ButtonGroup, Divider, Panel, Stack } from "rsuite";
import { ReactNode } from "react";
import { PlusButton } from "..";

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
    <Panel
      bordered
      shaded
      style={{
        backgroundColor: "white",
        marginBottom: 20,
        ...(props.style || {}),
      }}
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
    </Panel>
  );
}
