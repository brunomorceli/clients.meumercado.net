import { FlexboxGrid } from "rsuite";
import { Label, Title } from "./styles";
import {
  EOrderStatusHandler,
  GeneralUtils,
  IOrder,
} from "src/modules/shared";

interface OrderProps {
  order: IOrder;
}

export function Order(props: OrderProps) {
  const { order } = props;
  const total = (
    order.orderProducts.map((op) => op.quantity * op.price) || []
  ).reduce((total, current) => total + current, 0);

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={8}>
        <Title>{new Date(order.createdAt!).toLocaleDateString()}</Title>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8}>
        <Title>{GeneralUtils.getAmountLabel(total)}</Title>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8}>
        <Title>
          <Label style={{ color: EOrderStatusHandler.color(order.status!) }}>
            {EOrderStatusHandler.label(order.status!)}
          </Label>
        </Title>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
