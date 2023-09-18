import styled from "styled-components";

export const PriceLabel = styled.span<{showPrice: boolean}>`
  font-weight: bold;
  color: ${(props) => props.showPrice ? '#188d00' : 'grey'};
`;