import { Col, FlexboxGrid } from "rsuite";
import { Label, Title } from "./styles";
import { GeneralUtils, IOrder } from "@shared";

interface ProductsProps {
  order: IOrder;
}

export function Products(props: ProductsProps) {
  const { order } = props;
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);

  return (
    <>
      {order.orderProducts.map((op, index) => (
        <FlexboxGrid justify="space-between" key={index}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Label>Produto</Label>
            <Title>{op.product!.label}</Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
            <Label>Qtd.</Label>
            <Title>
              {op.quantity!}
              {GeneralUtils.getSulfixLabel(op.product!.quantitySulfix, " ")}
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
            <Label>Preço</Label>
            <Title>{GeneralUtils.getAmountLabel(op.price)}</Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
            <Label>Total</Label>
            <Title>
              {GeneralUtils.getAmountLabel(op.product!.price * op.quantity)}
            </Title>
          </Col>
          <FlexboxGrid.Item colspan={24}>
          <hr />

          </FlexboxGrid.Item>
        </FlexboxGrid>
      ))}
    </>
  );
}
