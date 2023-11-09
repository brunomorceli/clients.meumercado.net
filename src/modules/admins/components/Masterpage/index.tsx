import { Col, Grid } from "rsuite";
import { WebMasterpage } from "./Web";
import { ReactNode, useState } from "react";
import { MobileMasterpage } from "./Mobile";
import { NotificationSound } from "../NotificationSound";
import { ConfirmModal } from "@root/modules/shared";
import { useStore } from "zustand";
import { useAuthStore } from '@admins/stores';

import "../../middlewares/axios.middleware";

interface AdminMasterpageProps {
  children: ReactNode | null | undefined;
}

export function AdminMasterpage(props: AdminMasterpageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const authStore = useStore(useAuthStore);
  

  function handleSignout(): void {
    authStore.signout();
    setOpenModal(false);
  }

  return (
    <>
      <Grid style={{ width: "100%", margin: 0, padding: 0 }}>
        <Col
          xsHidden
          smHidden
          mdHidden
          lg={24}
          xl={24}
          xxl={24}
          style={{ border: 0, padding: 0 }}
        >
          <WebMasterpage onSignout={() => setOpenModal(true)}>{props.children}</WebMasterpage>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lgHidden
          xlHidden
          xxlHidden
          style={{ border: 0, padding: 0 }}
        >
          <MobileMasterpage onSignout={() => setOpenModal(true)}>{props.children}</MobileMasterpage>
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
