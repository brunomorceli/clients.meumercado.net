import { FlexboxGrid } from "rsuite";
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
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Label>Nome</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Qtd.</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Preço</Label>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Label>Total</Label>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <hr />
      {order.orderProducts.map((op, index) => (
        <>
          <FlexboxGrid key={index}>
            <FlexboxGrid.Item colspan={12}>
              <Title>{op.product!.label}</Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>
                {op.quantity!}
                {GeneralUtils.getSulfixLabel(op.product!.quantitySulfix, " ")}
              </Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>{GeneralUtils.getAmountLabel(op.price)}</Title>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Title>
                {GeneralUtils.getAmountLabel(op.product!.price * op.quantity)}
              </Title>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <hr />
        </>
      ))}
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={20}>
          <Title>Total</Title>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <Title>{GeneralUtils.getAmountLabel(total)}</Title>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
