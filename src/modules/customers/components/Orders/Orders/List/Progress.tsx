import { Timeline } from "rsuite";
import { CustomTimeline, Label, Title } from "./styles";
import {
  EOrderStatusHandler,
  GeneralUtils,
  IOrder,
} from "@shared";

interface ProgressProps {
  order: IOrder;
}

export function Progress(props: ProgressProps) {
  const { order } = props;

  return (
    <CustomTimeline>
      {order.orderLogs.map((ol, index) => (
        <Timeline.Item key={index} dot={EOrderStatusHandler.icon(ol.status)}>
          <p>
            <Title>{EOrderStatusHandler.label(ol.status)}</Title>
            <Label>{GeneralUtils.localTime(ol.createdAt, true)}</Label>
          </p>
        </Timeline.Item>
      ))}
    </CustomTimeline>
  );
}
