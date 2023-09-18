import { ICompany, ICompanyHandler } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  BrazilianState,
  CategoryForm,
  Cep,
  ImageGalery,
  InputBase,
  InputNumber,
  PanelBase,
  PhoneNumber,
  RichText,
  SaveButton,
} from "@/components";
import { IFindAddressResult } from "@/interfaces/find-address-result.interface";
import { message } from "antd";
import { Col, FlexboxGrid, Form, Row, Schema } from "rsuite";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const model = Schema.Model({
  label: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  cep: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(8, "CEP inválido"),
  address: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  addressNumber: Schema.Types.NumberType().isRequired(
    "Este campo é obrigatório."
  ),
  neighborhood: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  city: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  state: Schema.Types.StringType().isRequired("Este campo é obrigatório."),
  email: Schema.Types.StringType().isEmail("Email inválido"),
  phoneNumber: Schema.Types.StringType().minLength(11, "Telefone Inválido"),
  sponsor: Schema.Types.StringType().minLength(
    3,
    "Este campo deve conter pelo menos 3 caracteres"
  ),
});

interface CompanyFormProps {
  company?: ICompany | null | undefined;
  onSave: (company: ICompany) => void;
}

export function CompanyForm(props: CompanyFormProps) {
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});

  useEffect(() => {
    const data: any = props.company || ICompanyHandler.empty();
    setCompany({ ...data, tenantIdCheck: Boolean(data.id) });
  }, [props.company]);

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      return;
    }
    props.onSave(company);
  }

  function handleChangeCompanyKey(key: string, val: any): void {
    setCompany({ ...company, [key]: val });
  }

  function handleChangeCep(address: IFindAddressResult | null): void {
    if (!address) {
      message.error("CEP não encontrado.");
      return;
    }

    setCompany({ ...company, ...address });
  }

  const subdomain = (process.env.NEXT_PUBLIC_TENANT_URL as string).replace(
    "{tenant}",
    company.tenantId!
  );
  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={company}
      formError={formError}
      onChange={(data: any) => setCompany(data)}
      onError={setFormError}
      onSubmit={handleSubmit}
    >
      <PanelBase title="Dados da empresa">
        <InputBase
          label="Nome"
          value={company.label || ""}
          onChange={(val) => handleChangeCompanyKey("label", val)}
          error={formError.label}
        />
        <Row>
          <Form.ControlLabel>Subdomínio</Form.ControlLabel>
        </Row>
        <Row style={{ marginLeft: 3, marginBottom: 20 }}>
          <a href={subdomain} target="_blank">
            <h6>
              <FontAwesomeIcon icon={faLink} /> {subdomain}
            </h6>
          </a>
        </Row>

        <Row>
          <Form.ControlLabel>Logo</Form.ControlLabel>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <ImageGalery
            images={company.logo ?  [company.logo] : []}
            onChange={(images) => handleChangeCompanyKey('logo', images?.[0] || null)}
            disableAdd={Boolean(company.logo)}
          />
        </Row>

        <RichText
          value={company.description || ""}
          onChange={(value) => handleChangeCompanyKey("description", value)}
        />
      </PanelBase>

      <PanelBase title="Lacalização">
        <Cep
          value={company.cep}
          error={formError.cep}
          onSearch={(address) => handleChangeCep(address)}
        />
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={20} lg={20} xl={20}>
            <InputBase
              label="Logradouro"
              value={company.address}
              onChange={(val) => handleChangeCompanyKey("address", val)}
              error={formError.address}
            />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <InputNumber
              label="Número"
              value={company.addressNumber}
              onChange={(val) => handleChangeCompanyKey("addressNumber", val)}
              error={formError.addressNumber}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <InputBase
              label="Bairro"
              value={company.neighborhood}
              onChange={(val) => handleChangeCompanyKey("neighborhood", val)}
              error={formError.neighborhood}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <InputBase
              label="Complemento"
              value={company.addressComplement}
              onChange={(val) =>
                handleChangeCompanyKey("addressComplement", val)
              }
              error={formError.addressComplement}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <InputBase
              label="Cidade"
              value={company.city}
              onChange={(val) => handleChangeCompanyKey("city", val)}
              error={formError.city}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <BrazilianState
              label="Estado"
              value={company.state}
              error={formError.state}
              onChange={(val) => handleChangeCompanyKey("state", val)}
            />
          </Col>
        </FlexboxGrid>
      </PanelBase>
      <PanelBase title="Contato">
        <InputBase
          label="Email"
          value={company.email || ""}
          onChange={(val) => handleChangeCompanyKey("email", val)}
          error={formError.email}
        />
        <PhoneNumber
          value={company.phoneNumber}
          error={formError.phoneNumber}
          onChange={(val) => handleChangeCompanyKey("phoneNumber", val)}
        />
        <InputBase
          label="Responsável"
          value={company.manager || ""}
          onChange={(val) => handleChangeCompanyKey("manager", val)}
          error={formError.manager}
        />
      </PanelBase>

      <CategoryForm
        categories={company.categories}
        onChange={(categories) =>
          handleChangeCompanyKey("categories", categories)
        }
      />

      <FlexboxGrid justify="end">
        <SaveButton onClick={handleSubmit} />
      </FlexboxGrid>
    </Form>
  );
}
