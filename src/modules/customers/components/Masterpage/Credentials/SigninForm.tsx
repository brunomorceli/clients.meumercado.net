import { InputText } from "src/modules/shared/components";
import { useRef, useState } from "react";
import { Schema, Form, Button } from "rsuite";
import ShieldIcon from "@rsuite/icons/Shield";

interface SigninFormProps {
  onSubmit: (email: string) => void;
}

export function SigninForm(props: SigninFormProps) {
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

    props.onSubmit(formData.email);
  }

  return (
    <Form
      ref={formRef}
      model={model}
      formValue={formData}
      formError={formError}
      onChange={(data) => setFormData(data)}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <InputText
        label="Email"
        value={formData.email}
        error={formError.email}
        onChange={(email) => setFormData({ email })}
      />
      <Button
        appearance="primary"
        color="green"
        onClick={handleSubmit}
        block
        startIcon={<ShieldIcon />}
        size="lg"
      >
        Entrar
      </Button>
    </Form>
  );
}
