import { IConfirm } from "@/interfaces";
import { useAuthStore } from "@/stores";
import { message } from "antd";
import { useState } from "react";
import { useStore } from "zustand";
import { ConfirmForm } from "./ConfirmForm";
import { useRouter } from "next/router";

export function Confirm() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const [processing, setProcessing] = useState<boolean>(false);

  function handleConfirm(data: IConfirm): void {
    setProcessing(true);

    authStore
      .confirm(data)
      .then(() => {
        message.success('Bem-vindo(a).');
        router.replace('/');
      })
      .catch((e) => message.error(e))
      .finally(() => setProcessing(false));

  }

  return <ConfirmForm onSubmit={handleConfirm} />
}
