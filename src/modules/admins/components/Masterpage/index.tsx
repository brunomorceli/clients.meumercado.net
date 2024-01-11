import { Col, Grid } from "rsuite";
import { WebMasterpage } from "./Web";
import { ReactNode, useState } from "react";
import { MobileMasterpage } from "./Mobile";
import { NotificationSound } from "../NotificationSound";
import { ConfirmModal } from "src/modules/shared";
import { useStore } from "zustand";
import { useAuthStore } from "src/modules/admins/stores";

import "../../middlewares/axios.middleware";
import useBreakpoint from "use-breakpoint";

interface AdminMasterpageProps {
  children: ReactNode | null | undefined;
}

export function AdminMasterpage(props: AdminMasterpageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const authStore = useStore(useAuthStore);
  const { breakpoint } = useBreakpoint(
    { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 },
    "xs"
  );

  function handleSignout(): void {
    authStore.signout();
    setOpenModal(false);
  }

  return (
    <>
      <Grid style={{ width: "100%", margin: 0, padding: 0 }}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          style={{ border: 0, padding: 0 }}
        >
          {["lg", "xl", "xxl"].includes(breakpoint) && (
            <WebMasterpage onSignout={() => setOpenModal(true)}>
              {props.children}
            </WebMasterpage>
          )}
          {["xs", "sm", "md"].includes(breakpoint) && (
            <MobileMasterpage onSignout={() => setOpenModal(true)}>
              {props.children}
            </MobileMasterpage>
          )}
        </Col>
        <NotificationSound />
      </Grid>
      <ConfirmModal
        open={openModal}
        title="Sair"
        confirmText="Sair"
        onConfirm={handleSignout}
        onClose={() => setOpenModal(false)}
      >
        <h5>Deseja realmente sair?</h5>
      </ConfirmModal>
    </>
  );
}
