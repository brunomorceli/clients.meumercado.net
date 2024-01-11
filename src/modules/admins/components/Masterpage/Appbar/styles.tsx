import { Button, Header } from "rsuite";
import styled from "styled-components";

export const CustomHeader = styled(Header)`
  z-index: 99999;
  background-color: #7cb305;
  color: white;

  button {
    color: white;
  }

  button:hover {
    background-color: rgba(0,0,0,0.18);
    color: white;
  }

  border-bottom-color: rgba(255,255,255, 0.7);
  border-bottom-width: 2px;
  border-bottom-style: solid;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  box-shadow: 0px 2px 7px 2px rgba(0,0,0,0.28);
`; 

export const HomeButtom = styled(Button)`
  height: 64px;
  border-radius: 0px;
  justify-content: left;
  padding-right: 20px;
`;