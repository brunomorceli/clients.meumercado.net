import { ReactNode, useEffect, useState } from "react";
import { AppBar } from "./AppBar";
import { useStore } from "zustand";
import { useAuthStore, useCompanyStore } from "@customers/stores";

import "../../middlewares/axios.middleware";
import { useToasterStore } from "@root/modules/shared";
import { Col } from "rsuite";
import { CustomFlexboxGrid } from "./styles";

interface MasterpageProps {
  children: ReactNode | null | undefined;
}

export function CustomerMasterpage(props: MasterpageProps) {
  const authStore = useStore(useAuthStore);
  const toastStore = useStore(useToasterStore);
  const companyStore = useStore(useCompanyStore);
  const [processing, setProcessing] = useState<boolean>(true);
  const isAuth = authStore.authenticated;

  useEffect(() => {
    companyStore
      .get()
      .catch(toastStore.error)
      .finally(() => setProcessing(false));
  }, []);

  if (processing) {
    return null;
  }

  return (
    <>
      <AppBar
        title={
          isAuth ? authStore.companyName : process.env.NEXT_PUBLIC_APP_NAME
        }
      />
      <CustomFlexboxGrid justify="center">
        <Col xs={24} sm={24} md={18} lg={16} xl={16} xxl={12}>
          {props.children}
        </Col>
      </CustomFlexboxGrid>
    </>
  );
}
