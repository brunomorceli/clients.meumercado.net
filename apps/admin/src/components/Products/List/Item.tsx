/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Card, Modal, Typography } from "antd";

interface ProductListItemProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
  onDetails: (product: IProduct) => void;
}

export function ProductListItem(props: ProductListItemProps) {
  const { product, onEdit, onRemove, onDetails } = props;

  function handleRemove(): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          Deseja realmente remover <b>{product.label}</b>?
        </Typography>
      ),
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => onRemove(product),
    });
  }

  return (
    <Card
      style={{ margin: 5 }}
      cover={
        <img
          alt={product.label}
          src={product.cover || "images/no-image.png"}
          onClick={() => onDetails(product)}
          style={{cursor: 'pointer'}}
        />
      }
      actions={[
        <FileSearchOutlined
          key="btDetails"
          onClick={() => onDetails(product)}
        />,
        <EditOutlined key="btEdit" onClick={() => onEdit(product)} />,
        <DeleteOutlined key="btRemove" onClick={handleRemove} />,
      ]}
    >
      <Typography.Title level={5}>
        {product.label.toUpperCase()}
      </Typography.Title>
    </Card>
  );
}
