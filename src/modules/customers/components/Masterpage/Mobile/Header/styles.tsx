import { Dropdown, Stack } from "rsuite";
import styled from "styled-components";

export const HeaderContainer = styled(Stack.Item)`
  width: 100vw;
  min-height: 55px;
  background-color: var(--primary-color);
`;

export const CompanyName = styled.div`
  width: 100%;
  text-align: center;
  color: var(--header-text-color);
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;

  padding: 20px;
`;

export const Item = styled.div<{color?: string}>`
  display: inline-block;
  color: var(--header-text-color);
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  vertical-align: middle !important;
  padding: 8px;
  transition: all 0.2s;
  `;

export const DropdownSettings = styled(Dropdown)`
  &.rs-dropdown-menu {
    z-index: 999;
  }
`;

export const SecondaryHeader = styled(Stack.Item)`
  width: 100vw;
  padding-left: 20px;
  padding-right: 20px;
  height: 45px;
  background-color: var(--primary-color);
  position: absolute;
  z-index: 9;
  text-align: center;

  .categories {
    width: 100vw;
    max-height: 0px;
    position: relative;
    top: -3px;
    left: 0px;
    background-color: inherit;
    overflow: hidden;
    

    transition: all 0.2s;    
  } 
`;
