import { InputText, PublicGuard, TitleBase } from "@shared/components";
import { ISignup, ISignupHandler } from "@admins/interfaces";
import { useAuthStore, useToasterStore } from "@shared/stores";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Container, Schema, Form, Button, Panel, FlexboxGrid } from "rsuite";
import { useStore } from "zustand";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Por favor, informe um e-mail válido.")
    .isRequired("Este campo é obrigatório."),
  userName: StringType()
    .minLength(3, "Informe pelo menos 3 caracteres.")
    .isRequired("Este campo é obrigatório."),
  companyName: StringType()
    .minLength(3, "Informe pelo menos 3 caracteres.")
    .isRequired("Este campo é obrigatório."),
});

export default function Entrar() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<ISignup>(ISignupHandler.empty());

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    authStore
      .signup(formValue)
      .then(() => {
        toasterStore.success("Conta cadastrada com sucesso.");
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
    <PublicGuard>
      <Container>
        <TitleBase title="Nearstore - Cadastrar" />
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
                onClick={() => router.replace("/admins/signin")}
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
    </PublicGuard>
  );
}
