import { styled } from "styled-components";

export const ImageCustom = styled.div<{ src: string, heightPercent: number }>`
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  padding-bottom: ${(props) => props.heightPercent}%;
  border-radius: 10px;
  cursor: pointer;
`;