import { Container, Schema, Form, Button, Panel, FlexboxGrid } from "rsuite";
import { useStore } from "zustand";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { useToasterStore } from "src/modules/shared/stores";
import { useAuthStore } from "src/modules/admins/stores";
import { ISignup, ISignupHandler } from "src/modules/admins/interfaces";
import { InputText, TitleBase } from "src/modules/shared/components";
import { CredentialsSigninHandler } from "./CredentialsSigninPage";

export default function CredentialsSignupPage() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<ISignup>(ISignupHandler.empty());
  const model = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Por favor, informe um e-mail válido.")
      .isRequired("Este campo é obrigatório."),
    userName: Schema.Types.StringType()
      .minLength(3, "Informe pelo menos 3 caracteres.")
      .isRequired("Este campo é obrigatório."),
    companyName: Schema.Types.StringType()
      .minLength(3, "Informe pelo menos 3 caracteres.")
      .isRequired("Este campo é obrigatório."),
  });

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    setFormError({});

    authStore
      .signup(formValue)
      .then(() => {
        toasterStore.success("Conta cadastrada com sucesso.");
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
    <Container>
      <TitleBase title="Meumercado - Cadastrar" />
      <Form
        ref={formRef}
        model={model}
        formValue={formValue}
        formError={formError}
        onChange={(e) => setFormValue(e as any)}
        onError={setFormError}
        onSubmit={handleSubmit}
      >
        <Panel bordered style={{ backgroundColor: "white" }}>
          <InputText
            label="Email"
            value={formValue.email}
            error={formError.email}
            onChange={(email) => setFormValue({ ...formValue, email })}
          />

          <InputText
            label="Nome Completo"
            value={formValue.userName}
            error={formError.userName}
            onChange={(userName) => setFormValue({ ...formValue, userName })}
          />

          <InputText
            label="Nome da empresa"
            value={formValue.companyName}
            error={formError.companyName}
            onChange={(companyName) =>
              setFormValue({ ...formValue, companyName })
            }
          />
          <FlexboxGrid justify="space-between" style={{ marginTop: 20 }}>
            <Button
              appearance="link"
              onClick={() => navigate(CredentialsSigninHandler.navigate())}
            >
              Entrar
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </FlexboxGrid>
        </Panel>
      </Form>
    </Container>
  );
}

export class CredentialsSignupHandler {
  static route(): string {
    return "/admins/credentials/signup";
  }
  static navigate(): string {
    return "/admins/credentials/signup";
  }
}
