import { InputBase, TitleBase } from "@shared/components";
import { ISignup, ISignupHandler } from "@shared/interfaces";
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
  label: StringType()
    .minLength(3, "Informe pelo menos 3 caracteres.")
    .isRequired("Este campo é obrigatório."),
  firstName: StringType()
    .minLength(3, "Informe pelo menos 3 caracteres.")
    .isRequired("Este campo é obrigatório."),
  lastName: StringType()
    .minLength(3, "Informe pelo menos 3 caracteres.")
    .isRequired("Este campo é obrigatório."),
});

function TextField(props: any) {
  const { name, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
      <Form.ErrorMessage show={Boolean(error)}>{error}</Form.ErrorMessage>
    </Form.Group>
  );
}

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
        router.replace("/sigin");
      })
      .catch((e) => toasterStore.error(e));
  }

  return (
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
          <InputBase
            label="Email"
            value={formValue.email}
            error={formError.email}
            onChange={(email) => setFormValue({ ...formValue, email })}
          />

          <InputBase
            label="Nome"
            value={formValue.firstName}
            error={formError.firstName}
            onChange={(firstName) => setFormValue({ ...formValue, firstName })}
          />

          <InputBase
            label="Sobrenome"
            value={formValue.lastName}
            error={formError.lastName}
            onChange={(lastName) => setFormValue({ ...formValue, lastName })}
          />

          <InputBase
            label="Nome da empresa"
            value={formValue.label}
            error={formError.label}
            onChange={(label) => setFormValue({ ...formValue, label })}
          />
          <FlexboxGrid justify="space-between" style={{ marginTop: 20 }}>
            <Button appearance="link" onClick={() => router.replace("/admins/signin")}>
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
