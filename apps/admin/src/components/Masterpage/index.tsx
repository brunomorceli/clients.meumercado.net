import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { MasterpageComp } from "./styles";
import { useStore } from "zustand";
import { useAuthStore } from "@/stores";
import { Col, FlexboxGrid } from "rsuite";

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
            title={
              isAuth ? authStore.companyName : process.env.NEXT_PUBLIC_APP_NAME
            }
          />
          <DrawerComp />
        </>
      )}
      <FlexboxGrid justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          {props.children}
        </Col>
      </FlexboxGrid>
    </MasterpageComp>
  );
}
