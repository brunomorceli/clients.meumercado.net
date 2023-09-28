import { ButtonGroup, Divider, Panel, Stack } from "rsuite";
import { ReactNode } from "react";
import { PlusButton } from "..";

interface PanelBaseProps {
  title: string;
  children?: ReactNode | null | undefined;
  onAdd?: () => void;
  hideTitleDivider?: boolean;
}

export function PanelBase(props: PanelBaseProps) {
  const { title, children, hideTitleDivider, onAdd } = props;

  return (
    <Panel
      bordered
      shaded
      style={{ backgroundColor: "white", marginBottom: 20 }}
      header={
        <>
          <Stack justifyContent="space-between">
            <h5>{title}</h5>
            {onAdd &&
              <ButtonGroup>
                <PlusButton onClick={onAdd} />
              </ButtonGroup>
            }
          </Stack>
          {!hideTitleDivider && <Divider />}
        </>
      }
    >
      {children}
    </Panel>
  );
}
