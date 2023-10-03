import { FlexboxGrid, Navbar } from "rsuite";
import { styled } from "styled-components";

export const CustomNavbar = styled(Navbar)`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9;
  width: 100%;
  height: 115px;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  box-shadow: 0px 2px 7px 2px rgba(0,0,0,0.28);
`;

export const CustomFlexboxGrid = styled(FlexboxGrid)`
  padding-top: 135px;
  min-height: calc(100vh - 64px);
`;
