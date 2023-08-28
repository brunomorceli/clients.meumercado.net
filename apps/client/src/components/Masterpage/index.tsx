import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { MasterpageComp } from "./styles";
import { useStore } from "zustand";
import { useUserStore } from "@/stores";
import { Col, Row } from "antd";

interface MasterpageProps {
  title?: string;
  children: ReactNode | null | undefined;
}

export function Masterpage(props: MasterpageProps) {
  const userStore = useStore(useUserStore);

  return (
    <MasterpageComp>
      {userStore.authenticated &&
        <>
          <AppBar title={props.title || process.env.NEXT_PUBLIC_APP_NAME} />
          <DrawerComp />
        </>
      }
      <Row>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 0, span: 24 }}
          md={{ offset: 0, span: 24 }}
          lg={{ offset: 2, span:  20}}
          xl={{ offset: 2, span:  20}}
          xxl={{ offset: 2, span:  20}}
        >
          {props.children}
        </Col>
      </Row>
    </MasterpageComp>
  );
}
