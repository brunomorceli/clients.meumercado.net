import { IProduct } from "src/modules/shared/interfaces";
import { Button, List, Modal } from "rsuite";
import { useState } from "react";
import { ProductListItem } from "./Item";

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
          <ProductListItem
            key={index}
            product={item}
            onPick={onEdit}
            onRemove={setProduct}
          />
        ))}
        {products.length === 0 &&
          <List.Item>
            <strong>Nenhum resultado econtrado.</strong>
          </List.Item>
        }
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
