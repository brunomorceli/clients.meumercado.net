import { Col, Grid } from "rsuite";
import { WebMasterpage } from "./Web";
import { ReactNode } from "react";
import { MobileMasterpage } from "./Mobile";
import "../../middlewares/axios.middleware";
import { Notifications } from "../Notifications";

interface AdminMasterpageProps {
  children: ReactNode | null | undefined;
}

export function AdminMasterpage(props: AdminMasterpageProps) {
  return (
    <Grid style={{ width: '100%', margin: 0, padding: 0 }}>
      <Col xsHidden smHidden mdHidden lg={24} xl={24} xxl={24} style={{ border: 0, padding: 0 }}>
        <WebMasterpage>{props.children}</WebMasterpage>
      </Col>
      <Col xs={24} sm={24} md={24} lgHidden xlHidden xxlHidden style={{ border: 0, padding: 0 }}>
        <MobileMasterpage>{props.children}</MobileMasterpage>
      </Col>
      <Notifications />
    </Grid>
  );
}
