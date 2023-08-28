import { ISignin } from "@/interfaces";
import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";

interface SigninFormProps {
  onSubmit: (data: ISignin) => void;
}
export function SigninForm(props: SigninFormProps) {
  const [form, setForm] = useState<ISignin>({ email: "" });
  const [formHandler] = Form.useForm();

  function handleChangeForm(key: string, value: any): void {
    setForm({ ...form, [key]: value });
  }

  function handleSubmit(): void {
    formHandler.validateFields().then(() => props.onSubmit(form));
  }

  const title = process.env.NEXT_PUBLIC_APP_NAME || 'Mundigital';
  return (
    <Card>
      <Form form={formHandler}>
        <Form.Item>
          <Typography.Title level={4}>{title} - Entrar</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: 'email', required: true, message: 'Informe um email válido' }]}
        >
          <Input
            size="large"
            value={form.email}
            onChange={(e) => handleChangeForm("email", e.target.value || "")}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" onClick={handleSubmit}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
