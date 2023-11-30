import { IProduct } from "src/modules/shared/interfaces";
import { ProductCardItem } from "./Item";
import { Col, FlexboxGrid } from "rsuite";

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
          <>
            <Col xsHidden smHidden mdHidden lg={6} xl={4} xxl={4} key={index}>
              <ProductCardItem product={item} onAdd={props.onAdd} onDetails={props.onDetails} />
            </Col>
            <Col xs={12} sm={12} md={12} lgHidden xlHidden xxlHidden key={index}>
              <ProductCardItem expanded product={item} onAdd={props.onAdd} onDetails={props.onDetails} />
            </Col>
          </>
        ))}
      </FlexboxGrid>
    </>
  );
}