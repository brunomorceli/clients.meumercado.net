import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { MasterpageComp } from "./styles";
import { useStore } from "zustand";
import { useAuthStore } from "@/stores";
import { Col, Modal, Row, Typography } from "antd";
import { Companies } from "../Companies";

interface MasterpageProps {
  title?: string;
  children: ReactNode | null | undefined;
}

export function Masterpage(props: MasterpageProps) {
  const authStore = useStore(useAuthStore);

  const isAuth = authStore.authenticated;
  const noCompanies = authStore.auth.companies.length === 0;
  return (
    <MasterpageComp>
      {isAuth && (
        <>
          <AppBar
            hideButton={noCompanies}
            title={props.title || process.env.NEXT_PUBLIC_APP_NAME}
          />
          <DrawerComp />
        </>
      )}
      <Row>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 0, span: 24 }}
          md={{ offset: 0, span: 24 }}
          lg={{ offset: 2, span: 20 }}
          xl={{ offset: 2, span: 20 }}
          xxl={{ offset: 2, span: 20 }}
        >
          {isAuth && noCompanies ? (
            <Modal open={true} footer={false} closeIcon={false}>
              <Typography.Title level={3}>
                Para começar, vamos criar uma empresa.
              </Typography.Title>
              <Companies />
            </Modal>
          ) : (
            props.children
          )}
        </Col>
      </Row>
    </MasterpageComp>
  );
}
