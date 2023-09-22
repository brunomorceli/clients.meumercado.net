import { Card, Image } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 165px;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
`;

export const CardCustom = styled(Card)`
  height: 150px;
  margin-left: 5px;
  margin-right: 5px;

  .ant-card-actions {
    height: 40px;
  }

  .ant-card-cover {
    height: 100px;
    width: 100px;
    vertical-align: middle;
  }

  .ant-card-body {
    height: 0px;
    display: none;
  }
`;

export const ImageCustom = styled(Image)<{ src: string }>`
  display: inline-block;
  position: relative;
  height: 100px;
  width: 100px;
  margin-left: 5px;
  margin-right: 5px;
  background-image: url("${(props) => props.src}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: white;
  border-radius: 5px;
  border-style: solid;
  border-color: #d4d4d4;
  border-width: 1px;
  cursor: pointer;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.28);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.28);

  button {
    position: absolute;
    right: 2px;
    top: 2px;
  }
`;
