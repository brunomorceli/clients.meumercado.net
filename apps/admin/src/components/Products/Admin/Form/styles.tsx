import { Card, Upload } from "antd";
import styled from "styled-components";

export const CardCustom = styled(Card)`
  .ant-upload.ant-upload-select {
    width: 100%;
  }
  .img {
    border-radius: 10px;
  }
`;
export const ImageUpload = styled.img`
  width: 100% !important;
  height: auto;
  border-radius: 10px !important;
  cursor: pointer;
`;