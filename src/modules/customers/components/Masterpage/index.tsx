import { ReactNode, useEffect } from "react";
import { AppBar } from "./AppBar";

import "../../middlewares/axios.middleware";
import { Col, FlexboxGrid, Header } from "rsuite";
import { useStore } from "zustand";
import { useCompanyStore } from "@customers/stores";
import { CartDrawer } from "./CartDrawer";
import { Credentials } from "./Credentials";
import { CustomContainer } from "./styles";

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
      <CustomContainer>
        <FlexboxGrid justify="center">
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            {props.children}
          </Col>
        </FlexboxGrid>
      </CustomContainer>
      <CartDrawer />
      <Credentials />
    </>
  );
}
