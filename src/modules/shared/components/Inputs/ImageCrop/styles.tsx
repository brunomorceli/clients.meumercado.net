import { styled } from "styled-components";

export const ImageCustom = styled.div<{ src: string, heightPercent: number }>`
  width: 100%;
  background-image: url(${(props) => props.src});
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding-bottom: ${(props) => props.heightPercent}%;
  border-radius: 10px;
  border-style: solid;
  border-color: #e2e2e2;
  border-width: 2px;
  cursor: pointer;
`;