import { IConfirm } from "@admins/interfaces";
import { useAuthStore, useToasterStore } from "@shared/stores";
import { useState } from "react";
import { useStore } from "zustand";
import { ConfirmForm } from "./ConfirmForm";
import { useRouter } from "next/router";

interface ConfirmProps {
  authId: string;
}

export function Confirm(props: ConfirmProps) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const [processing, setProcessing] = useState<boolean>(false);

  function handleConfirm(data: IConfirm): void {
    setProcessing(true);

    authStore
      .confirm(data)
      .then(() => toasterStore.success('Bem-vindo(a).'))
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));

  }

  return <ConfirmForm authId={props.authId} onSubmit={handleConfirm} onCancel={() => router.replace('/admins/signin')} />
}
