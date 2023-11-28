import {
  ConfirmModal,
  CredentialsModal,
  IUser,
  useToasterStore,
} from "src/modules/shared";
import { useStore } from "zustand";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { useAuthStore, useMasterpageStore } from "@customers/stores";
import { SignupForm } from "./SignupForm";
import { ConfirmForm } from "./ConfirmForm";
import { SigninForm } from "./SigninForm";
import { Button, FlexboxGrid } from "rsuite";

export function Credentials() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const masterpageStore = useStore(useMasterpageStore);
  const toasterStore = useStore(useToasterStore);
  const [state, setState] = useState<"signin" | "signup" | "confirm">("signin");
  const [openConfirmClose, setOpenConfirmClose] = useState<boolean>(false);
  const [authId, setAuthId] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const titles = {
    signin: "Entrar",
    signup: "Criar conta",
    confirm: "Código de confirmação",
  };

  useEffect(() => {
    if (!authStore.authenticated && !masterpageStore.login) {
      setTimeout(() => setState("signin"), 500);
    }
  }, [authStore.authenticated, masterpageStore.login]);

  function handleClose(): void {
    if (state === "confirm") {
      setOpenConfirmClose(true);
      return;
    }

    masterpageStore.setLogin(false);
  }

  function handleConfirmClose(): void {
    setOpenConfirmClose(false);
    masterpageStore.setLogin(false);
  }

  function handleSignin(email: string): void {
    setProcessing(true);

    authStore
      .signin(email)
      .then((res) => {
        if (!res) {
          toasterStore.info(
            "Parece que não há nenhuma conta criada com esse email, vamos criar uma nova conta?"
          );
          setState("signup");
          return;
        }

        setAuthId(res.authId);
        setState("confirm");
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleSignup(user: IUser): void {
    setProcessing(true);

    authStore
      .signup(user)
      .then(() => {
        toasterStore.success("Conta criada com sucesso. Agora é só logar.");
        setState("signin");
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleConfirm(confirmationCode: string): void {
    setProcessing(true);

    authStore
      .confirm({ confirmationCode, authId })
      .then(() => {
        masterpageStore.setLogin(false);
        toasterStore.success("Bem-vindo(a)");
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  return (
    <>
      <CredentialsModal
        open={!authStore.authenticated && masterpageStore.login}
        title={titles[state]}
        onClose={handleClose}
      >
        {state === "signin" && <SigninForm onSubmit={handleSignin} />}
        {state === "signup" && <SignupForm onSubmit={handleSignup} />}
        {state === "confirm" && <ConfirmForm onSubmit={handleConfirm} />}
        <FlexboxGrid justify="space-between">
          {state !== "confirm" && (
            <>
              <FlexboxGrid.Item colspan={11}>
                <Button
                  appearance="link"
                  disabled={state === "signin"}
                  block
                  onClick={() => setState("signin")}
                >
                  Entrar
                </Button>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={11}>
                <Button
                  appearance="link"
                  disabled={state === "signup"}
                  block
                  onClick={() => setState("signup")}
                >
                  Criar conta
                </Button>
              </FlexboxGrid.Item>
            </>
          )}
        </FlexboxGrid>
      </CredentialsModal>
      <ConfirmModal
        open={openConfirmClose}
        onConfirm={handleConfirmClose}
        onClose={() => setOpenConfirmClose(false)}
      >
        Deseja realmente sair?
      </ConfirmModal>
    </>
  );
}
