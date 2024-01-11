import { useState } from "react";
import { useStore } from "zustand";
import { useNavigate } from "react-router";

import { ConfirmForm } from "./ConfirmForm";
import { useToasterStore } from "src/modules/shared/stores";
import { useAuthStore } from "src/modules/admins/stores";
import { CredentialsSigninHandler } from "src/modules/admins/pages/Credentials/CredentialsSigninPage";

interface ConfirmProps {
  authId: string;
}

export function Confirm(props: ConfirmProps) {
  const navigate = useNavigate();
  const { authId } = props;
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const [processing, setProcessing] = useState<boolean>(false);

  function handleConfirm(confirmationCode: string): void {
    setProcessing(true);

    authStore
      .confirm({ confirmationCode, authId })
      .then(() => toasterStore.success("Bem-vindo(a)."))
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));
  }

  return (
    <ConfirmForm
      authId={authId}
      onSubmit={handleConfirm}
      onCancel={() => navigate(CredentialsSigninHandler.navigate())}
    />
  );
}
