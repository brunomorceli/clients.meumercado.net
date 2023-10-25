import { Dropdown, Stack } from "rsuite";
import styled from "styled-components";

export const HeaderContainer = styled(Stack.Item)<{ backgroundColor?: string }>`
  width: 100vw;
  min-height: 55px;
  background-color: ${(props) => props.backgroundColor || '#8bc34a'};
`;

export const CompanyName = styled.div<{color?: string}>`
  display: flex;
  color: ${(props) => props.color || 'white'};
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;

  padding: 20px;
`;

export const Item = styled.div<{color?: string}>`
  display: inline-block;
  color: ${(props) => props.color || 'white'};
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  vertical-align: middle !important;
  padding: 8px;
  opacity: 0.8;
  transition: all 0.2s;
  
  &:hover {
    opacity: 1;
    transition: all 0.4s;
  }
  `;

export const DropdownSettings = styled(Dropdown)`
  &.rs-dropdown-menu {
    z-index: 999;
  }
`;

export const SecondaryHeader = styled(Stack.Item)<{ backgroundColor?: string }>`
  width: 100vw;
  height: 40px;
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
    opacity: 0;
    overflow: hidden;
    

    transition: all 0.2s;    
  }
  
  &:hover {
    .categories {
      max-height: 100vh;
      transition: all 0.5s;
      opacity: 0.9;
      overflow: unset;
    }
  }  
`;
