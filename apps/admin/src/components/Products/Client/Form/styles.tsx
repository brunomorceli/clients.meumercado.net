import { Button, Modal, Typography } from "antd";
import { styled } from "styled-components";

export const ModalCustom = styled(Modal)`
  //animation-duration: 0.01s !important;

  .ant-modal-content {
    padding: 0px;
  }
`;

export const CardLabel = styled(Typography.Text)`
  display: block;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
`;

export const CardDescription = styled(Typography.Text)`
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #b1b1b1;
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

export const CardActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  
  .ant-btn {
    font-weight: bold;
    min-width: 50px;
  }

  .ant-input-number {
    flex-grow: 1;
    
    input {
      color: #5f5f5f;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
   }
  }
`;

export const CardAddButton = styled(Button)`
  background-color: #5b8c00;
  color: white;
  font-size: 14px;
  border: unset;
  margin-bottom: 10px;
  &:hover {
    align-items: center;
     background-color: #73b101;
     color: white !important;
     border: unset;
  }
`;