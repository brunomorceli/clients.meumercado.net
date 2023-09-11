import { Button, Card, Col, Row } from "antd";
import { styled } from "styled-components";

export const CardRow = styled(Row)`
  width: 100%;
`;

export const CardCol = styled(Col)`
  width: calc(100% - 50px);
  margin: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  height: calc(100% - 20px);

  border-style: solid;
  border-width: 1px;
  border-color: #dbdbdb;
  border-radius: 10px;
  margin: 10px !important;
  margin-bottom: 10px;
`;

export const CardPercentFlag = styled.div`
  text-align: center;
  position: absolute !important;
  top: 09px;
  left: 10px;
  background-color: #f5222d;
  color: white;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 2px;
  width: calc(100% - 22px);
`;

export const CardImage = styled.div<{src: string}>`
  width: 100%;
  padding-top: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src});
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
`;

export const CardDescription = styled.div`
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  width: calc(100% - 20px);
  padding: 10px;
`;

export const CardPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: calc(100% - 20px);
  padding: 10px;
  flex-grow: 1;
`;

export const CardOldPrice = styled.div`
  width: 100%;
  color: #bfbfbf;
  font-weight: 600;
  text-align: right;
  text-decoration-line: line-through;
`;

export const CardPrice = styled.div<{isPromotion?: boolean}>`
  font-weight: bold !important;
  font-size: 30px;
  color: ${(props) => props.isPromotion ? '#f5222d' : '#1677ff'} !important;
  text-align: right;
`;

export const CardButtonContainer = styled.div`
  text-align: center !important;
  width: 100%;
  vertical-align: bottom !important;
`;

export const CardButton = styled(Button)`
  background-color: #5b8c00;
  color: white;
  font-size: 14px;
  border: unset;
  &:hover {
    align-items: center;
     background-color: #73b101;
     color: white !important;
     border: unset;
  }
`;
