import { FlexboxGrid } from "rsuite";
import { Label, Title } from "./styles";
import { EOrderStatusHandler, GeneralUtils } from "@shared";
import { IOrderResult } from "@root/modules/admins/interfaces";

interface OrderProps {
  order: IOrderResult;
}

export function Order(props: OrderProps) {
  const { order } = props;

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={4}>
        <Title>{GeneralUtils.localTime(order.createdAt, true)}</Title>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}>
        <Title>{order.userName}</Title>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Title>{GeneralUtils.getAmountLabel(order.total)}</Title>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Title>
          <Label style={{ color: EOrderStatusHandler.color(order.status!) }}>
            {EOrderStatusHandler.label(order.status!)}
          </Label>
        </Title>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
