import { Spin, Typography } from "antd";
import styled from "styled-components";

export const Container = styled.div`
display: flex;
margin-top: 5rem;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;

`;

export const StyleSpin = styled(Spin)`
  .ant-spin-dot {
    font-size: 50px;
    i {
      background-color: #3859FF; 

    }
  }
`;

export const Title = styled(Typography)`
color: #707070;
font-weight: 400;
line-height: 15px;
margin-top: 10px;
font-size: 13px;

`;