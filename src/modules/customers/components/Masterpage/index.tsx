import { ReactNode, useEffect } from "react";
import { AppBar } from "./AppBar";

import "../../middlewares/axios.middleware";
import { Col } from "rsuite";
import { CustomFlexboxGrid } from "./styles";
import { useStore } from "zustand";
import { useCompanyStore } from "@customers/stores";
import { CartDrawer } from "./CartDrawer";
import { Credentials } from "./Credentials";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function CustomerMasterpage(props: MasterpageProps) {
  const companyStore = useStore(useCompanyStore);

  useEffect(() => {
    companyStore.get();
  }, []);

  return (
    <>
      <AppBar />
      <CartDrawer />
      <Credentials />
      <CustomFlexboxGrid justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          {props.children}
        </Col>
      </CustomFlexboxGrid>
    </>
  );
}
