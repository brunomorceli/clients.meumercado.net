import { IConfirm } from "@shared/interfaces";
import { Button, Card, Form, Input, Result, Typography } from "antd";
import { useEffect, useState } from "react";

interface ConfirmFormProps {
  authId: string;
  onSubmit: (data: IConfirm) => void;
  onCancel?: () => void;
}
export function ConfirmForm(props: ConfirmFormProps) {
  const [form, setForm] = useState<IConfirm>({ confirmationCode: '', authId: props.authId });
  const [formHandler] = Form.useForm();

  useEffect(() => {
    setForm({ ...form, authId: props.authId });
  }, [props.authId]);

  function handleChangeForm(key: string, value: any): void {
    setForm({ ...form, [key]: value });
  }

  function handleSubmit(): void {
    formHandler.validateFields().then(() => props.onSubmit(form));
  }

  return (
    <Card>
      <Result
        status="success"
        title="Código de confirmação"
        subTitle="Um código de confirmação foi enviado para seu email."
        extra={[
          <Form form={formHandler} key="form" autoComplete="off">
            <Form.Item>
              <Typography.Title level={4}>Digite o código:</Typography.Title>
            </Form.Item>
            <Form.Item
              label="Código de confirmação"
              name="confirmationCode"
              rules={[
                { required: true, message: 'Informe um código de confirmação.' },
                { len: 5, message: 'O código deve conter 5 caracteres.'}
              ]}
            >
              <Input
                size="large"
                value={form.confirmationCode}
                onChange={(e) => handleChangeForm("confirmationCode", e.target.value || "")}
              />
            </Form.Item>
            <Form.Item>
              {props.onCancel &&
                <>
                  <Button size="large" onClick={props.onCancel}>
                    Cancelar
                  </Button>
                  &nbsp;
                </>
              }
              <Button type="primary" size="large" onClick={handleSubmit}>
                Confirmar
              </Button>
            </Form.Item>
          </Form>
        ]}
      />
    </Card>
  );
}
