import { IAuthenticate } from "@/interfaces";
import { useAuthStore } from "@/stores";
import { Typography, message } from "antd";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Container, Schema, Form, ButtonToolbar, Button } from "rsuite";
import { useStore } from "zustand";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Por favor, informe um e-mail válido.")
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
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [value, setValue] = useState<IAuthenticate>({
    email: "",
    label: null,
  });

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    authStore
      .authenticate(value)
      .then((res: any) => {
        if (!res.tenantId) {
          setValue({ ...value, label: "" });
        } else {
          router.replace(`/confirm/${res.authId}`);
        }
      })
      .catch((e) => message.error(e));
  }

  return (
    <Container>
      <h3>Nearstore</h3>
      <Form
        ref={formRef}
        model={model}
        formValue={value}
        formError={formError}
        onChange={(e) => setValue(e as any)}
        onError={setFormError}
        onSubmit={handleSubmit}
      >
        {value.label !== null && (
          <>
            <TextField
              name="label"
              label="Nome da empresa"
              error="Por favor, informe o nome da empresa"
            />
          </>
        )}
        <TextField name="email" label="Email" />
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Entrar
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </Container>
  );
}
