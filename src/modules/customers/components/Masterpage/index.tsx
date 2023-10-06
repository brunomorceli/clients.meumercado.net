import { ReactNode, useEffect } from "react";
import { AppBar } from "./AppBar";

import "../../middlewares/axios.middleware";
import { Col, Container, FlexboxGrid, Header } from "rsuite";
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
      <Header style={{ position: 'fixed', width: '100%', zIndex: 9}}>
        <AppBar />
      </Header>
      <Container>
        <FlexboxGrid justify="center">
          <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
            {props.children}
          </Col>
        </FlexboxGrid>
      </Container>
      <CartDrawer />
      <Credentials />
    </>
  );
}
