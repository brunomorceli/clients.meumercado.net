import { ICartProduct, IProduct } from "@/interfaces";
import { Col } from "antd";
import { ProductClientItem } from "./Item";
import { CardRow } from "./styles";
import { useState } from "react";
import { ProductCardForm } from "../Form";

interface ProductClientListProps {
  products: IProduct[];
  onRemove: (product: IProduct) => void;
  onSave: (cartProduct: ICartProduct) => void;
}

export function ProductClientList(props: ProductClientListProps) {
  const { products, onSave } = props;
  const [product, setProduct] = useState<IProduct | null>(null);

  function handleSave(cartProduct: ICartProduct): void {
    onSave(cartProduct);
    setProduct(null);
  }
  return (
    <>
      <CardRow>
        {products.map((item: IProduct, index: number) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4} key={index}>
            <ProductClientItem product={item} onClick={(p) => setProduct(p)} />
          </Col>
        ))}
      </CardRow>
      <ProductCardForm
        cartProduct={product ? { product, quantity: 1 } : null}
        onSave={handleSave}
        onClose={() => setProduct(null)}
      />
    </>
  );
}
