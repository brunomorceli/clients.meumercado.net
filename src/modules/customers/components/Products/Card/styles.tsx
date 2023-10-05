import { styled } from "styled-components";

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

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  width: 100%;
  padding: 10px;
`;


export const CardPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  padding: 5px;
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
  font-size: 20px;
  color: ${(props) => props.isPromotion ? '#f5222d' : '#5b8c00'} !important;
  text-align: right;
`;

export const CardButtonContainer = styled.div`
  text-align: center !important;
  width: 100%;
  vertical-align: bottom !important;
`;