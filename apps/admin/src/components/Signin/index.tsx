import { IConfirm, ISignin } from "@/interfaces";
import { useAuthStore } from "@/stores";
import { message } from "antd";
import { useState } from "react";
import { useStore } from "zustand";
import { SigninForm } from "./SigninForm";
import { ConfirmForm } from "./ConfirmForm";
import { useRouter } from "next/router";

export function Signin() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const [processing, setProcessing] = useState<boolean>(false);
  const [state, setState] = useState<'signin' | 'confirm'>('signin');


  function handleSignup(data: ISignin): void {
    setProcessing(true);

    authStore
      .signin(data)
      .then(() => setState('confirm'))
      .catch((e) => message.error(e))
      .finally(() => setProcessing(false));
  }

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

  return state === 'signin' 
    ? <SigninForm onSubmit={handleSignup} /> 
    : <ConfirmForm onSubmit={handleConfirm} />
}
