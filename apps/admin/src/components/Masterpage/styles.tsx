import { Button, List, Select, Typography } from "antd";
import { styled } from "styled-components";

export const AppBarComp = styled.div`
  width: 100%;
  height: 64px;
  background-color: #2196f3;
  color: white;
  display: flex;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1;
  vertical-align: middle !important;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.28);
  box-shadow: 0px 2px 7px 2px rgba(0,0,0,0.28);
`;

export const MasterpageComp = styled.div`
  padding-top: 84px;
  min-height: calc(100vh - 64px);
`;

export const AppBarMenuBtn = styled(Button)`
  font-size: 20px;
  padding-left: 25px;
  padding-right: 25px;
  height: 64px;
  color: white;
  background-color: unset;
  vertical-align: middle;
  border-radius: 0px;
  border-style: none;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:hover * {
    color: white;
  }
`;

export const AppBarTitle = styled(Typography.Title)`
  color: white !important;
  margin-top: 17px;
  margin-left: 10px;
`;

export const DrawerListItem = styled(List.Item)`
  height: 60px;
  vertical-align: middle;
  line-height: 60px;
  margin: 0px !important;
  padding: 0px !important;
  cursor: pointer;

  transition: 0.5s all;

  &:hover {
    background-color: #fbfbfb;
    color: #ffffff;
    transition: 0.2s all;
  }

  h4 {
    margin: 0px;
    padding: 0px;
  }
`;

export const AppBarLeftActions = styled.div`
  position: absolute;
  right: 15px;
  top: 16px;
  vertical-align: middle !important;
`;

export const CustomSelect = styled(Select)`
  .ant-select-selector {
    background-color: inherit !important;
    color: white;
    font-size: 14px;
    font-weight: bold !important;
  }

  .ant-select-arrow {
    color: white !important;
  }
`;
 