import { Panel } from "rsuite";
import styled from "styled-components";

export const CustomPanel = styled(Panel)`
  margin-bottom: 20px;
    background-color: var(--panel-background-color);
    color: var(--panel-text-color);
  h5, label, input {
    color: var(--panel-text-color);
  }
`;