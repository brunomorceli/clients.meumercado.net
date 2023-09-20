import { ICompany, ICompanyHandler } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  AddressForm,
  AddressFormSchema,
  CategoryForm,
  ImageGalery,
  InputBase,
  PanelBase,
  PhoneNumber,
  SaveButton,
} from "@/components";
import { IFindAddressResult } from "@/interfaces/find-address-result.interface";
import { message } from "antd";
import { FlexboxGrid, Form, Row, Schema } from "rsuite";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const model = Schema.Model({
  label: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres")
    .addRule((val, data) => {
      console.log(val, '-', data);
      return true;
    }, 'error'),
  email: Schema.Types.StringType().isEmail("Email inválido"),
  phoneNumber: Schema.Types.StringType().minLength(11, "Telefone Inválido"),
  manager: Schema.Types.StringType().minLength(
    3,
    "Este campo deve conter pelo menos 3 caracteres"
  ),
  ...AddressFormSchema,
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
        <InputBase
          label={`Descrição (${company.description?.length}/${2024})`}
          value={company.description || ""}
          error={formError.description}
          options={{ as: 'textarea', rows:5 }}
          onChange={(value) => handleChangeCompanyKey("description", value.substring(0, 2024))}
        />
      </PanelBase>

      <PanelBase title="Lacalização">
        <AddressForm
          data={company as any}
          error={formError}
          onChange={(data: any) => setCompany({ ...company, ...data })}
        />
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
