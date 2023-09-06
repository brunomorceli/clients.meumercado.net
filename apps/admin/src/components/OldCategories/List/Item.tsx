import { ICategory } from "@/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { ColorIcon, ListItem } from "./styles";

interface CategoryListItemProps {
  category: ICategory;
  onEdit: (category: ICategory) => void;
  onRemove: (category: ICategory) => void;
}

export function CategoryListItem(props: CategoryListItemProps) {
  const { category, onEdit, onRemove } = props;

  function handleRemove(): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          Deseja realmente remover <b>{category.label}</b>?
        </Typography>
      ),
      cancelText: "Cancelar",
      onOk: () => onRemove(category),
    });
  }

  return (
    <ListItem
      actions={[
        <Button
          size="large"
          key="btnEdit"
          type="text"
          onClick={() => onEdit(category)}
        >
          <EditOutlined />
        </Button>,
        <Button size="large" key="btnDelete" type="text" onClick={handleRemove}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <Typography.Text strong>
        <ColorIcon color={category.color} />
        {category.label}
      </Typography.Text>
    </ListItem>
  );
}
