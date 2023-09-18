import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { MasterpageComp } from "./styles";
import { useStore } from "zustand";
import { useAuthStore } from "@/stores";
import { Col, Row } from "antd";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function Masterpage(props: MasterpageProps) {
  const authStore = useStore(useAuthStore);

  const isAuth = authStore.authenticated;
  return (
    <MasterpageComp>
      {isAuth && (
        <>
          <AppBar
            title={isAuth ? (authStore.auth.company || {}).label : process.env.NEXT_PUBLIC_APP_NAME}
          />
          <DrawerComp />
        </>
      )}
      <Row>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 0, span: 24 }}
          md={{ offset: 0, span: 24 }}
          lg={{ offset: 6, span: 12 }}
          xl={{ offset: 6, span: 12 }}
          xxl={{ offset: 6, span: 12 }}
        >
          {props.children}
        </Col>
      </Row>
    </MasterpageComp>
  );
}
