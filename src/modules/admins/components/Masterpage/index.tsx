import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { useStore } from "zustand";
import { useAuthStore } from "@admins/stores";

import "../../middlewares/axios.middleware";
import { CustomFlexboxGrid } from "./styles";
import { Col } from "rsuite";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function AdminMasterpage(props: MasterpageProps) {
  const authStore = useStore(useAuthStore);
  const isAuth = authStore.authenticated;

  return (
    <>
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
      <CustomFlexboxGrid justify="center">
        <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
          {props.children}
        </Col>
      </CustomFlexboxGrid>
    </>
  );
}
