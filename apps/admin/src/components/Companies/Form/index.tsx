import { ICompany, ICompanyHandler } from "@/interfaces";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { CardCustom } from "./styles";
import { ImageCrop } from "@/components/ImageCrop";

interface CompanyFormProps {
  company?: ICompany | null | undefined;
  onSave: (company: ICompany) => void;
  onClose: () => void;
}

export function CompanyForm(props: CompanyFormProps) {
  const { onSave, onClose } = props;
  const [formHandler] = Form.useForm();
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());

  useEffect(() => {
    const data: any = props.company || ICompanyHandler.empty();
    setCompany(data);

    Object.keys(data).forEach((key) => {
      formHandler.setFieldValue(key, data[key]);
    });

  }, [formHandler, props.company]);

  function handleChangeCompany(key: string, val: any): void {
    setCompany({ ...company, [key]: val });
  }

  function handleChangeLogo(logo?: string | null | undefined): void {
    setCompany({ ...company, logo: logo || undefined });
  }

  function handleSubmit(): void {
    formHandler.validateFields().then(() => onSave(company));
  }

  return (
    <Modal
      open={Boolean(props.company)}
      onCancel={onClose}
      title={company.id ? "Editar empresa" : "Criar empresa"}
      footer={null}
    >
      <CardCustom
        style={{ margin: 5 }}
        cover={<ImageCrop src={company.logo} onChange={handleChangeLogo} />}
      >
        <Form form={formHandler}>
          <Form.Item
            label="Nome"
            name="label"
            rules={[{ required: true, message: "Informe um nome válido" }]}
            initialValue={company.label}
          >
            <Input
              size="large"
              value={company.label}
              autoComplete="off"
              onChange={(e) =>
                handleChangeCompany("label", e.target.value || "")
              }
            />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="description"
            style={{ marginBottom: 0 }}
            initialValue={company.description}
          >
            <Input.TextArea
              size="large"
              rows={5}
              maxLength={2048}
              value={company.label}
              onChange={(e) =>
                handleChangeCompany("description", e.target.value || "")
              }
            />
          </Form.Item>
          <div style={{ textAlign: "right", marginBottom: 15 }}>
            <Typography.Text disabled>
              {(company.description || "").length}/{2048}
            </Typography.Text>
          </div>
          <div>
            <Button type="primary" size="large" onClick={handleSubmit}>
              {company.id ? "Salvar" : "Criar"}
            </Button>
          </div>
        </Form>
      </CardCustom>
    </Modal>
  );
}
