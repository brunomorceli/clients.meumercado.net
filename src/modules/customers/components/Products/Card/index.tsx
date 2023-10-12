import { IProduct } from "@shared/interfaces";
import { ProductCardItem } from "./Item";
import { Col, FlexboxGrid, Row } from "rsuite";

interface ProductCardListProps {
  products: IProduct[];
  onAdd: (product: IProduct) => void;
  onDetails: (product: IProduct) => void;
}

export function ProductCard(props: ProductCardListProps) {
  return (
    <>
      <FlexboxGrid justify="start" align="top">
        {props.products.map((item: IProduct, index: number) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4} key={index}>
            <ProductCardItem product={item} onAdd={props.onAdd} onDetails={props.onDetails} />
          </Col>
        ))}
      </FlexboxGrid>
    </>
  );
}