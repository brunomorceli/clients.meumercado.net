import styled from "styled-components";

export const Category = styled.div`
  color: white;
  cursor: pointer;
  font-weight: 500;
  display: inline-block;
  border-radius: 0px !important;
  padding: 15px;
  margin: 5px;
  font-size: 16px;
  white-space: break-spaces;
  transition: all 0.5s;

  &:hover {
    opacity: 1;
    background-color: rgba(0,0,0, 0.1);
    transition: all 0.3s;
  }
`;