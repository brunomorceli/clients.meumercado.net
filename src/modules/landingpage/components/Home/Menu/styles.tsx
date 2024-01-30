import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9;
  background-color: #7cb305;
  width: 100%;
  color: white;
  display: block;
`;

export const Logo = styled.img`
  display: inline-block;
  height: 20px; 
  margin-top: 25px;
  vertical-align: middle;
`;

export const Button = styled.div`
  color: white;
  font-size: 16px;
  vertical-align: middle;
  height: 70px;
  padding-left: 10px;
  padding-right: 10px;
  transition: all 0.5s;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  float: right;

  &:hover {
    background-color: #00000033;
    cursor: pointer;
    transition: all 0.2s;
  }
`;