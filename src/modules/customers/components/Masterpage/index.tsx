import { Col, Grid } from "rsuite";
import { WebMasterpage } from "..";
import { ReactNode } from "react";
import { MobileMasterpage } from "./Mobile";

interface CustomerMasterpageProps {
  children: ReactNode;
}

export function CustomerMasterpage(props: CustomerMasterpageProps) {
  return (
    <>
      <Grid style={{ width: '100%', margin: 0, padding: 0 }}>
        <Col xsHidden smHidden mdHidden lg={24} xl={24} xxl={24} style={{ border: 0, padding: 0 }}>
          <WebMasterpage>{props.children}</WebMasterpage>
        </Col>
        <Col xs={24} sm={24} md={24} lgHidden xlHidden xxlHidden style={{ border: 0, padding: 0 }}>
          <MobileMasterpage>{props.children}</MobileMasterpage>
        </Col>
      </Grid>
    </>
  );
}
