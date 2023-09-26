import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { DrawerComp } from "./Drawer";
import { MasterpageComp } from "./styles";
import { useStore } from "zustand";
import { useAuthStore } from "@shared/stores";
import { Col, FlexboxGrid } from "rsuite";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function Masterpage(props: MasterpageProps) {
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
      {props.children}
    </>
  );
}
