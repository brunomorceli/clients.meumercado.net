import { List } from "rsuite";
import { IActionListItem } from "./interfaces/action-list-item.interface";
import { ActionListItem } from "./Item";
import { ConfirmModal } from "../..";
import { useState } from "react";

interface ActionListProps {
  items: IActionListItem[];
  onClick?: (item: IActionListItem) => void;
  onEdit?: (item: IActionListItem) => void;
  onRemove?: (item: IActionListItem) => void;
  hover?: boolean;
}

export function ActionList(props: ActionListProps) {
  const [target, setTarget] = useState<IActionListItem | null>(null);

  function handleRemove(): void {
    props.onRemove && props.onRemove(target!);
    setTarget(null);
  }

  return (
    <>
      <List hover={props.hover}>
        {props.items.map((item, index) => (
          <ActionListItem
            key={index}
            item={item}
            onEdit={props.onEdit}
            onRemove={setTarget}
            onClick={props.onClick}
          />
        ))}
      </List>
      <ConfirmModal
        open={Boolean(target)}
        onConfirm={handleRemove}
        onClose={() => setTarget(null)}
        title="Remover"
      >
        Deseja realmente remover este item?
      </ConfirmModal>
    </>
  );
}
