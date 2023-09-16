import { IProduct } from "@/interfaces";
import { Avatar, Button, FlexboxGrid, IconButton, List, Modal } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import { useState } from "react";

interface ProductListProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function ProductList(props: ProductListProps) {
  const { products, onEdit, onRemove } = props;
  const [product, setProduct] = useState<IProduct | null>(null);

  function handleRemove() {
    onRemove(product!);
    setProduct(null);
  }

  return (
    <>
      <List hover>
        {products.map((item, index) => (
          <List.Item key={index} index={index + 1}>
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={2} style={{}}>
                <Avatar
                  src={
                    item.pictures.length !== 0 ? item.pictures[0] : undefined
                  }
                />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                colspan={18}
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  overflow: "hidden",
                }}
              >
                <div>{item.label}</div>
                <div style={{ fontSize: 15 }}>{item.description || "-"}</div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>
                <IconButton
                  circle
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => onEdit(item)}
                />
                &nbsp;
                <IconButton
                  circle
                  icon={<TrashIcon />}
                  size="sm"
                  onClick={() => setProduct(item)}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </List.Item>
        ))}
      </List>
      <Modal role="dialog" open={Boolean(product)} backdrop="static">
        <Modal.Header closeButton={false}>
          <Modal.Title>Remover atributo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover o atributo &nbsp;
          <strong>{(product || {}).label || ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setProduct(null)}>Cancelar</Button>
          <Button appearance="primary" onClick={handleRemove}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
