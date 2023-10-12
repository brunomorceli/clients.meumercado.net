import { FlexboxGrid } from "rsuite";
import { Label } from "./styles";

export function OrderHeader() {
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={8}>
        <Label>Data</Label>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8}>
        <Label>Valor</Label>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8}>
        <Label>Status</Label>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
