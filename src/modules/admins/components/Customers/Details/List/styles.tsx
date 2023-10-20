import { FlexboxGrid, Panel } from "rsuite";
import styled from "styled-components";

export const Label = styled.div`
  width: 100%;
  font-size: 14px;
  color: grey;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.h6`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const CustomPanel = styled(Panel)`
  .rs-panel-header {
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;