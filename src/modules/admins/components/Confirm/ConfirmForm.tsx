import { Schema, Form, Button, Panel } from "rsuite";
import { useRef, useState } from "react";
import { InputText } from "src/modules/shared/components";
import CheckIcon from "@rsuite/icons/Check";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import { IConfirm } from "src/modules/admins/interfaces";

interface ConfirmFormProps {
  authId: string;
  onSubmit: (confirmationCode: string) => void;
  onCancel?: () => void;
}

export function ConfirmForm(props: ConfirmFormProps) {
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formData, setFormData] = useState<any>({ confirmationCode: "" });
  const model = Schema.Model({
    confirmationCode: Schema.Types.StringType()
      .minLength(5, "Código inválido")
      .maxLength(5, "Código inválido")
      .isRequired("Este campo é obrigatório."),
  });

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }

    props.onSubmit(formData.confirmationCode);
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
      <h3 style={{ textAlign: "center" }}>
        <CheckRoundIcon color="#40af00" />
        &nbsp; Sucesso!
      </h3>
      <Panel
        bordered
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#fbfbfb" }}
      >
        <p>
          Um código de confirmação foi enviado para seu email cadastrado.
          <br />
          Por favor, digite o código para continuar:
        </p>
      </Panel>
      <InputText
        label="Código de confirmação"
        value={formData.confirmationCode}
        error={formError.confirmationCode}
        onChange={(confirmationCode) => setFormData({ confirmationCode })}
      />
      <Button
        appearance="primary"
        color="green"
        onClick={handleSubmit}
        block
        startIcon={<CheckIcon />}
        size="lg"
      >
        Confirmar
      </Button>
    </Form>
  );
}
