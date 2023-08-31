import { ICompany, ICompanyHandler } from "@/interfaces";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { CardCustom } from "./styles";
import { ImageCrop, Cep, PhoneNumber } from "@/components";
import { IFindAddressResult } from "@/interfaces/find-address-result.interface";
import { useStore } from "zustand";
import { useCompanyStore } from "@/stores";
import { GeneralUtils } from "@/utils";

interface CompanyFormProps {
  company?: ICompany | null | undefined;
  onSave: (company: ICompany) => void;
  onClose: () => void;
}

const subdomainCache: any = {};
export function CompanyForm(props: CompanyFormProps) {
  const companyStore = useStore(useCompanyStore);
  const { onSave, onClose } = props;
  const [formHandler] = Form.useForm();
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const companyRef = useRef(company);

  useEffect(() => {
    const data: any = props.company || ICompanyHandler.empty();

    companyRef.current = { ...data, subdomainCheck: Boolean(data.id) };
    setCompany(companyRef.current);

    Object.keys(data).forEach((key) => {
      formHandler.setFieldValue(key, data[key]);
    });
  }, [props.company]);

  function setSubdomainError(msg?: string): void {
    const errorMsg = msg || "O subodmínio já se encontra em uso";
    const errors = formHandler
      .getFieldError("subdomain")
      .filter((e: string) => e !== errorMsg);

    formHandler.setFields([
      { name: "subdomain", errors: [errorMsg, ...errors] },
    ]);
  }

  function checkSubdomain(subdomain: string, id?: string): void {
    if (subdomain.length < 3) {
      return;
    }

    if (subdomainCache[subdomain]) {
      const available= subdomainCache[subdomain];

      companyRef.current = { ...companyRef.current, subdomainCheck: available };
      setCompany(companyRef.current);
      !available && setSubdomainError();

      return;
    }

    companyStore
      .checkSubdomain(subdomain, id)
      .then((available) => {
        subdomainCache[subdomain] = available;
        companyRef.current = { ...companyRef.current, subdomainCheck: available };
        setCompany(companyRef.current);
        !available && setSubdomainError();
      })
      .catch((e) => message.error(e));
  }

  function handleChangeCompany(key: string, val: any): void {
    companyRef.current = { ...companyRef.current, [key]: val };
    setCompany(companyRef.current);
  }

  function handleChangeSubdomain(val: string): void {
    const subdomain = val
      .toLowerCase()
      .replace(/^[^a-z]+/, "")
      .replace(/[^a-z0-9]/g, "")
      .replace(/[ ]/g, '');

    companyRef.current = { ...companyRef.current, subdomain, subdomainCheck: false };
    setCompany(companyRef.current);
    formHandler.setFieldValue("subdomain", subdomain);

    checkSubdomain(subdomain, company.id);
  }

  function handleChangeLogo(logo?: string | null | undefined): void {
    companyRef.current = { ...companyRef.current, logo: logo || undefined };
    setCompany(companyRef.current);
  }

  function handleChangeCep(address: IFindAddressResult | null): void {
    if (!address) {
      message.error("CEP não encontrado.");
      return;
    }

    companyRef.current = { ...companyRef.current, ...address };
    setCompany(companyRef.current);

    Object.keys(address).forEach((key) => {
      formHandler.setFieldValue(key, (address as any)[key]);
    });
  }

  function handleSubmit(): void {
    formHandler
      .validateFields()
      .then(() => onSave(company))
      .catch(() => null);
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
        cover={
          <ImageCrop
            src={company.logo}
            onChange={handleChangeLogo}
            aspect="dynamic"
          />
        }
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
              onChange={(e: any) =>
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
              value={company.description}
              onChange={(e: any) =>
                handleChangeCompany("description", e.target.value || "")
              }
            />
            <div style={{ textAlign: "right", marginBottom: 15 }}>
              <Typography.Text disabled>
                {(company.description || "").length}/{2048}
              </Typography.Text>
            </div>
          </Form.Item>
          <Form.Item
            label="Subdomínio"
            name="subdomain"
            validateStatus={!companyRef.current.subdomainCheck ? "error" : "success"}
            hasFeedback
            rules={[
              { required: true, message: "Informe um subdomínio." },
              {
                pattern: /^[a-z]+/,
                message: "O subdomínio deve iniciar com letras.",
              },
              {
                min: 3,
                message: "O subdomínio deve conter pelo menos 3 caracteres.",
              },
            ]}
            initialValue={companyRef.current.subdomain}
          >
            <Input
              value={companyRef.current.subdomain}
              onChange={(e) => handleChangeSubdomain(e.target.value || "")}
            />
          </Form.Item>
          <Form.Item
            label="CEP"
            name="cep"
            rules={[{ required: true, message: "Informe o CEP." }]}
            initialValue={company.cep}
          >
            <Cep onSearch={(address) => handleChangeCep(address)} />
          </Form.Item>
          <Form.Item
            label="Endereço"
            name="address"
            initialValue={company.address}
            rules={[{ required: true, message: "Informe o endereço." }]}
          >
            <Input
              size="large"
              value={company.address}
              onChange={(e: any) =>
                handleChangeCompany("address", e.target.value || "")
              }
            />
          </Form.Item>
          <Form.Item
            label="Número"
            name="addressNumber"
            initialValue={company.addressNumber}
            rules={[{ required: true, message: "Informe o número." }]}
          >
            <InputNumber
              size="large"
              min="0"
              step={1}
              value={(company.addressNumber || "").toString()}
              onChange={(e) => handleChangeCompany("addressNumber", e)}
            />
          </Form.Item>
          <Form.Item
            label="Bairro"
            name="neighborhood"
            initialValue={company.neighborhood}
            rules={[{ required: true, message: "Informe o bairro." }]}
          >
            <Input
              size="large"
              value={company.address}
              onChange={(e: any) =>
                handleChangeCompany("neighborhood", e.target.value || "")
              }
            />
          </Form.Item>
          <Form.Item
            label="Complemento"
            name="addressComplement"
            initialValue={company.addressComplement}
          >
            <Input
              size="large"
              value={company.address}
              onChange={(e: any) =>
                handleChangeCompany("addressComplement", e.target.value || "")
              }
            />
          </Form.Item>
          <Form.Item
            label="Cidade"
            name="city"
            initialValue={company.city}
            rules={[{ required: true, message: "Informe a cidade." }]}
          >
            <Input
              size="large"
              value={company.address}
              onChange={(e: any) =>
                handleChangeCompany("city", e.target.value || "")
              }
            />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="state"
            initialValue={company.state}
            rules={[{ required: true, message: "Informe o estado." }]}
          >
            <Select
              options={[
                { label: "Selecione", value: "" },
                ...GeneralUtils.brazilianStates(),
              ]}
              onChange={(value) => handleChangeCompany("state", value)}
              value={company.state}
            />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="phoneNumber"
            initialValue={company.phoneNumber}
            rules={[
              {
                required: company.phoneNumber.length !== 0,
                pattern: /^\d{10,11}$/,
                message: "Telefone inválido",
              },
            ]}
          >
            <PhoneNumber
              onChange={(value) => handleChangeCompany("phoneNumber", value)}
              value={company.phoneNumber}
            />
          </Form.Item>
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
