import { ReactNode, useEffect } from "react";
import { Header } from "./Header";

import "src/modules/customers/middlewares/axios.middleware";
import { Col, FlexboxGrid, Stack } from "rsuite";
import { useStore } from "zustand";
import { useCompanyStore } from "src/modules/customers/stores";
import { CartDrawer } from "../CartDrawer";
import { Credentials } from "../Credentials";
import { Container } from "./styles";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function MobileMasterpage(props: MasterpageProps) {
  const companyStore = useStore(useCompanyStore);

  useEffect(() => {
    companyStore.get();
  }, []);

  return (
    <>
      <Container
        alignItems="flex-start"
        justifyContent="center"
        direction="column"
      >
        <Header />
        <Stack.Item
          className="ns-content"
          grow={1}
          style={{
            width: "100%",
            overflow: "hidden",
            overflowY: "auto",
            marginTop: 45,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <FlexboxGrid justify="center">
            <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
              {props.children}
            </Col>
          </FlexboxGrid>
        </Stack.Item>
      </Container>
      <CartDrawer />
      <Credentials />
    </>
  );
}
