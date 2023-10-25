import { IconButton, List, Stack } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { IActionListItem } from "./interfaces/action-list-item.interface";

interface ActionListItemProps {
  item: IActionListItem;
  onClick?: (item: IActionListItem) => void;
  onEdit?: (item: IActionListItem) => void;
  onRemove?: (item: IActionListItem) => void;
}

export function ActionListItem(props: ActionListItemProps) {
  const { item, onClick, onEdit, onRemove } = props;
  return (
    <List.Item>
      <Stack alignItems="flex-start" spacing={10}>
        {item.prefix && (
          <div
            onClick={() => onClick && onClick(item)}
            style={{ cursor: "pointer " }}
          >
            {item.prefix}
          </div>
        )}
        <Stack.Item grow={1}>
          <div style={{ width: "100%", cursor: "pointer" }}>
            <Stack alignItems="flex-start">
              <Stack.Item grow={1}>
                <div onClick={() => onClick && onClick(item)}>
                  <h6>{item.primary}</h6>
                  {item.secondary && <span>{item.secondary}</span>}
                </div>
              </Stack.Item>
              <Stack.Item alignSelf="flex-start">
                {onEdit && (
                  <IconButton
                    icon={item.icon || <EditIcon />}
                    onClick={() => onEdit && onEdit(item)}
                  />
                )}
                {onRemove && (
                  <IconButton
                    icon={item.icon || <TrashIcon />}
                    onClick={() => onRemove && onRemove(item)}
                  />
                )}
              </Stack.Item>
            </Stack>
          </div>
        </Stack.Item>
      </Stack>
    </List.Item>
  );
}
