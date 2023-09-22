import { IConfirm } from "@/interfaces";
import { useAuthStore, useToasterStore } from "@/stores";
import { useState } from "react";
import { useStore } from "zustand";
import { ConfirmForm } from "./ConfirmForm";
import { useRouter } from "next/router";

interface ConfirmProps {
  authId: string;
  onCancel?: () => void;
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
      .then(() => {
        toasterStore.success('Bem-vindo(a).');
        router.replace('/');
      })
      .catch((e) => toasterStore.error(e))
      .finally(() => setProcessing(false));

  }

  return <ConfirmForm authId={props.authId} onSubmit={handleConfirm} onCancel={props.onCancel} />
}
