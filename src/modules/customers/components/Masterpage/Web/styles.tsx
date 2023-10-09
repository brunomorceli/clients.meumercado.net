import { Col, Content, Nav, Navbar, Row, Sidebar, Stack } from "rsuite";
import { styled } from "styled-components";

export const CustomContainer = styled(Row)`
  margin-top: 115px;
  padding-top: 40px;
  padding-bottom: 40px;
  height: calc(100vh - 115px);
  overflow: hidden;
  overflow-y: auto;
  background-color: white;
`;

export const CustomNavbar = styled(Navbar)`
  display: block;
  width: 100%;
  min-height: 55px;
  //background-color: #8bc34a;
  background-color: red;
  width: 100%;
  z-index: 9;

  *.rs-nav-bar {
    display: none;
  }

  a {
    color: white;
    font-weight: 500;
    font-size: medium;
  }
`;

export const CustomNavbarTitle = styled(Nav.Item)``;

export const CustomNavCategories = styled(Navbar)`
  width: 100%;
  background-color: #8bc34a;

  *.rs-nav-bar {
    display: none;
  }

  a {
    color: white;
    font-weight: 500;
    font-size: medium;
  }

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

// ==============================================================================
export const WebContainer = styled(Stack)`
  height: 100vh;
`;

