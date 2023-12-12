import styled from "styled-components";

export const Label = styled.div`
  width: calc(100% - 10px);
  font-weight: 500;
  margin-left: 10px;
`;

export const WebImage = styled.div<{ picture?: string }>`
  width: 256px;
  height: 256px;
  background-color: var(--rs-avatar-bg);
  background-image: url('${(props) => props.picture || "../../../images/no-image.png"}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 10px;
  cursor: pointer;
`;


