import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  //background-color: rgb(124, 179, 5);
  background-image: url("images/landingpage/1.jpg");
  background-position: bottom center;
  background-size: cover;
  color: white;
  vertical-align: middle;
`;

export const Content = styled.div`
  display: inline-block;
  margin-top: 25vh;
  padding: 30px;
  width: 100%;
  height: 50vh;
  vertical-align: middle;
  background-color: rgba(0,0,0, 0.5);
`;

export const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  padding: 20px;
  padding-top: 30px;
`;