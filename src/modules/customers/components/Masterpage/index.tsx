import { ReactNode, useEffect } from "react";
import { AppBar } from "./AppBar";

import "../../middlewares/axios.middleware";
import { Button, Col, Container, FlexboxGrid, Header, Row, Stack } from "rsuite";
import { useStore } from "zustand";
import { useCompanyStore } from "@customers/stores";
import { CartDrawer } from "./CartDrawer";
import { Credentials } from "./Credentials";
import { WebAppbar, WebCategories, WebContainer } from "./styles";

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
      <WebContainer alignItems="flex-start" justifyContent="center" direction="column">
        <AppBar />
        <Stack.Item grow={1} style={{ width: '100%', overflow: 'hidden', overflowY: 'auto', paddingTop: 40 }}>
          <FlexboxGrid justify="center">
            <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
              {props.children}
            </Col>
          </FlexboxGrid>
        </Stack.Item>
      </WebContainer>
      <CartDrawer />
      <Credentials />
    </>
  );
/*<Stack justifyContent="center" alignItems="flex-start">
    <AppBar />
    
    
      <CustomContainer>
        <FlexboxGrid justify="center">
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            {props.children}
          </Col>
        </FlexboxGrid>
      </CustomContainer>
     

  </Stack>*/
}
