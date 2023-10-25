import { Timeline } from "rsuite";
import { CustomTimeline, Label, Observation, Title } from "./styles";
import { EOrderStatusHandler, GeneralUtils, IOrder } from "@shared";

interface OrderProgressProps {
  order: IOrder;
}

export function OrderProgress(props: OrderProgressProps) {
  function getObservation(observation?: string): string {
    if (!observation || observation.length === 0) {
      return "";
    }

    return ` - "${observation}"`;
  }

  const { order } = props;
  return (
    <CustomTimeline>
      {order.orderLogs.map((ol, index) => (
        <Timeline.Item key={index} dot={EOrderStatusHandler.icon(ol.status)}>
          <p>
            <Title>
              {EOrderStatusHandler.label(ol.status)}
              <Observation>{getObservation(ol.observation)}</Observation>
            </Title>
            <Label>{GeneralUtils.localTime(ol.createdAt, true)}</Label>
          </p>
        </Timeline.Item>
      ))}
    </CustomTimeline>
  );
}
