import { ICompany, ICompanyHandler } from "@shared/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  AddressForm,
  AddressFormSchema,
  ImageGalery,
  InputBase,
  PanelBase,
  PhoneNumber,
  SaveButton,
} from "@shared/components";
import { CategoryForm } from '../Categories';
import { FlexboxGrid, Form, Row, Schema } from "rsuite";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "zustand";
import { useToasterStore } from "@shared/stores";

const model = Schema.Model({
  name: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  email: Schema.Types.StringType().isEmail("Email inválido"),
  phoneNumber: Schema.Types.StringType().minLength(11, "Telefone Inválido"),
  responsible: Schema.Types.StringType().minLength(
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
  const toasterStore = useStore(useToasterStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});

  useEffect(() => {
    const data: any = props.company || ICompanyHandler.empty();
    setCompany({ ...data, tenantIdCheck: Boolean(data.id) });
  }, [props.company]);

  function handleChangeCompanyKey(key: string, val: any): void {
    setCompany({ ...company, [key]: val });
  }

  function handleSubmit(): void {
    if (!formRef.current.check()) {
      toasterStore.error('Por favor, preencha os campos obrigatórios.')
      return;
    }
    props.onSave(company);
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
          label="Nome (obrigatório)"
          value={company.name || ""}
          onChange={(val) => handleChangeCompanyKey("name", val)}
          error={formError.name}
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
          label={`Descrição (${company.description?.length || 0}/${2024})`}
          value={company.description || ""}
          error={formError.description}
          options={{ as: 'textarea', rows:5 }}
          onChange={(value) => handleChangeCompanyKey("description", value.substring(0, 2024))}
        />
      </PanelBase>

      <PanelBase title="Localização">
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
          value={company.responsible || ""}
          onChange={(val) => handleChangeCompanyKey("responsible", val)}
          error={formError.responsible}
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
