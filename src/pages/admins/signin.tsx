import { InputText, PublicGuard, TitleBase } from "@shared/components";
import { useAuthStore, useToasterStore } from "@shared/stores";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Schema, Form, Button, Panel, FlexboxGrid } from "rsuite";
import { useStore } from "zustand";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Por favor, informe um e-mail válido.")
    .isRequired("Este campo é obrigatório."),
});

export default function SigninPage() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formData, setFormData] = useState<any>({ email: "" });

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
          router.replace("/admins/signup");
          return;
        }

        router.replace(`/admins/confirm/${res.authId}`);
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
    <PublicGuard>
      <TitleBase title="Nearstore - Entrar" />
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
              onClick={() => router.replace("/admins/signup")}
            >
              Criar Conta
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              Entrar
            </Button>
          </FlexboxGrid>
        </Panel>
      </Form>
    </PublicGuard>
  );
}
