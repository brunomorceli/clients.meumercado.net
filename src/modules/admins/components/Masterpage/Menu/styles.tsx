import { Button, Col } from "rsuite";
import styled from "styled-components";

export const SidenavContainer = styled.div`
  height: calc(100vh - 64px);
  border-radius: 0px;
  padding: 0px;
  margin: 0px;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 2px 7px 2px rgba(0, 0, 0, 0.28);
`;

export const ContentContainer = styled(Col)`
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 64px);
  padding: 20px;
  padding-top: 20px;
`;

export const MenuButton = styled(Button)`
  height: 64px;
  border-radius: 0px;
  text-align: left;
  margin: 0px;
`;