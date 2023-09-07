import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button, Container, Schema, Form, ButtonToolbar } from "rsuite";
import { useStore } from "zustand";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Por favor, informe um e-mail válido.")
    .isRequired("Este campo é obrigatório."),
});

function TextField(props: any) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

export default function Entrar() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<any>({
    email: "",
    label: null,
  });

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    authStore
      .authenticate(formValue.email, formValue.label)
      .then((res: any) => {
        const { subdomain } = res;

        if (!subdomain) {
          setFormValue({ ...formValue, label: "" });
          return;
        }

        window.location.assign(
          (process.env.NEXT_PUBLIC_TENANT_BASE_URL as string).replace(
            "{tenant}",
            subdomain
          )
        );
      })
      .catch((e) => console.log(e));
  }

  return (
    <Container>
      <h3>Nearstore</h3>
      <Form
        ref={formRef}
        model={model}
        formValue={formValue}
        onChange={setFormValue}
        onError={setFormError}
        onSubmit={handleSubmit}
      >
        {formValue.label !== null && (
          <TextField name="label" label="Nome da empresa" />
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
