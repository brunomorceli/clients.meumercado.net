import { Col, Content, Nav, Navbar, Sidebar, Stack } from "rsuite";
import { styled } from "styled-components";

export const CustomNavbar = styled(Navbar)`
  width: 100%;
  height: 115px;
  background-color: #8bc34a;

  /*
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  box-shadow: 0px 2px 7px 2px rgba(0,0,0,0.28);
   */
`;

export const CustomSidebar = styled(Sidebar)`
  background-color: white;
  height: calc(100vh - 115px);
  width: 15vw;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 2px 7px 2px rgba(0, 0, 0, 0.18);
`;

export const CustomContent = styled(Content)`
  height: calc(100vh - 115px);
  width: 85vw;
  overflow: hidden;
  overflow-y: auto;
`;

export const CustomNavMenu = styled(Nav.Menu)`
  font-weight: 500;
  display: block;
  &.rs-dropdown {
    height: 50px;
    padding: 0px;
    margin: 4px;
    margin-left: 0px;
    .rs-dropdown-toggle {
      height: 50px;
      border-radius: 0px;
    }
  }
`;

export const CustomNavItem = styled(Nav.Item)`
  font-weight: 500;
  display: block;
  height: 50px;
  border-radius: 0px !important;
  padding-top: 15px;
  white-space: break-spaces;
`;

export const CustomCol = styled(Col)`
  white-space: break-spaces;
  width: calc(100% - 20px);
`;
