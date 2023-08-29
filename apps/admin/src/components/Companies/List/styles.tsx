import { Image, Row, Typography } from "antd";
import { styled } from "styled-components";

export const CardRow = styled(Row)`
  width: 100%;
`;

export const ListImage = styled(Image)`
  &img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const CustomTypo = styled(Typography.Title)`
  width: 100%;
  margin: 0px !important;
  padding: 0px;
`;
