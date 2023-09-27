import { FlexboxGrid } from "rsuite";
import styled from "styled-components";

export const FlexboxGridItemEllipsis = styled(FlexboxGrid.Item)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #9c9c9c;
  vertical-align: middle;
`;