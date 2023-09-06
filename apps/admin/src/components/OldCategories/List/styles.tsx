import { List } from "antd";
import { styled } from "styled-components";

export const ColorIcon = styled.div<{color: string}>`
  width: 15px;
  height: 15px;
  margin: 10px;
  background-color: ${(props) => props.color};
  border-radius: 100%;
  vertical-align: middle;
  display: inline-block;
`;

export const ListItem = styled(List.Item)`
  padding: 0px;
  margin: 0px;
`;