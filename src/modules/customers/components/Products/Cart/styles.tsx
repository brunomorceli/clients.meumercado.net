import { Button } from "rsuite";
import styled from "styled-components";

export const TitleCustom = styled(Button)`
  justify-content: flex-start;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #292929;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubtitleCustom = styled.div`
  width: 100%;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #00a700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
