import { ReactNode } from "react";
import { AppBar } from "./AppBar";

import "../../middlewares/axios.middleware";
import { Col } from "rsuite";
import { CustomFlexboxGrid } from "./styles";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function CustomerMasterpage(props: MasterpageProps) {
  return (
    <>
      <AppBar />
      <CustomFlexboxGrid justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          {props.children}
        </Col>
      </CustomFlexboxGrid>
    </>
  );
}
