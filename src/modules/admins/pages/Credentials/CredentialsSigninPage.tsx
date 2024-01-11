import { InputText, TitleBase } from "src/modules/shared/components";
import { useToasterStore } from "src/modules/shared/stores";
import { useAuthStore } from "src/modules/admins/stores";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Schema, Form, Button, Panel, FlexboxGrid } from "rsuite";
import { useStore } from "zustand";
import { CredentialsSignupHandler } from "./CredentialsSignupPage";
import { CredentialsConfirmHandler } from "./CredentialsConfirmPage";

export default function CredentialsSigninPage() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formData, setFormData] = useState<any>({ email: "" });
  const model = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Por favor, informe um e-mail válido.")
      .isRequired("Este campo é obrigatório."),
  });

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    setFormError({});

    authStore
      .signin(formData.email)
      .then((res) => {
        if (!res) {
          toasterStore.info(
            "Parece que não há nenhuma conta criada com esse email, vamos criar uma nova conta?",
            { duration: 6000 }
          );
          navigate(CredentialsSignupHandler.navigate());
          return;
        }

        navigate(CredentialsConfirmHandler.navigate(res.authId));
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
    <>
      <TitleBase title="Meumercado - Entrar" />
      <Form
        ref={formRef}
        model={model}
        formValue={formData}
        formError={formError}
        onChange={(data) => setFormData(data)}
        onError={setFormError}
        onSubmit={handleSubmit}
      >
        <Panel bordered style={{ backgroundColor: "white" }}>
          <InputText
            label="Email"
            value={formData.email}
            error={formError.email}
            onChange={(email) => setFormData({ email })}
          />
          <FlexboxGrid justify="space-between">
            <Button
              appearance="link"
              onClick={() => navigate(CredentialsSignupHandler.navigate())}
            >
              Criar Conta
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              Entrar
            </Button>
          </FlexboxGrid>
        </Panel>
      </Form>
    </>
  );
}

export class CredentialsSigninHandler {
  static route(): string {
    return '/admins/credentials/signin';
  }
  static navigate(): string {
    return '/admins/credentials/signin';
  }
}
