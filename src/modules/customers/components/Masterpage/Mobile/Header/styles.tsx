import { Dropdown, Stack } from "rsuite";
import styled from "styled-components";

export const HeaderContainer = styled(Stack.Item)<{ backgroundColor?: string }>`
  width: 100vw;
  min-height: 55px;
  background-color: ${(props) => props.backgroundColor || '#8bc34a'};
`;

export const CompanyName = styled.div<{color?: string}>`
  width: 100%;
  text-align: center;
  color: ${(props) => props.color || 'white'};
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;

  padding: 20px;
`;

export const Item = styled.div<{color?: string}>`
  display: inline-block;
  color: ${(props) => props.color || 'white'};
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

export const SecondaryHeader = styled(Stack.Item)<{ backgroundColor?: string }>`
  width: 100vw;
  padding-left: 20px;
  padding-right: 20px;
  height: 45px;
  background-color: ${(props) => props.backgroundColor || '#8bc34a'};
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
