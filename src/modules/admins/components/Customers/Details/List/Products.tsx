import { Avatar, Col, FlexboxGrid, Stack } from "rsuite";
import { Label, Title, Total } from "./styles";
import { GeneralUtils, IOrder, IProduct } from "src/modules/shared";

interface ProductsProps {
  order: IOrder;
  onDetails: (product: IProduct) => void;
}

export function Products(props: ProductsProps) {
  const { order, onDetails } = props;
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);

  return (
    <>
      {order.orderProducts.map((op, index) => (
        <div key={index}>
          <Stack justifyContent="flex-start" alignItems="center">
            <Stack.Item style={{ marginRight: 10, cursor: 'pointer' }}>
              <Avatar src={op.product!.pictures?.[0]} onClick={() => onDetails(op.product!)} />
            </Stack.Item>
            <Stack.Item grow={1}>
              <FlexboxGrid justify="space-between">
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
              </FlexboxGrid>
            </Stack.Item>
          </Stack>
            <hr />
        </div>
      ))}
      <FlexboxGrid.Item colspan={24}>
        <FlexboxGrid justify="end">
          <FlexboxGrid.Item>
            <Total>Total: {GeneralUtils.getAmountLabel(total)}</Total>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </>
  );
}
