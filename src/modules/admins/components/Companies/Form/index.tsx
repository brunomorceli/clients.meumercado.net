/* eslint-disable react-hooks/exhaustive-deps */
import { ICompany, ICompanyHandler } from "src/modules/shared/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  AddressForm,
  AddressFormSchema,
  ImageGalery,
  InputPhoneNumber,
  InputText,
  PanelBase,
  SaveButton,
} from "src/modules/shared/components";
import { CategoryForm } from "../Categories";
import { FlexboxGrid, Form, Row, Schema } from "rsuite";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "zustand";
import { useToasterStore } from "src/modules/shared/stores";
import { useCompanyStore, useAuthStore } from "src/modules/admins/stores";

const model = Schema.Model({
  ...AddressFormSchema,
  name: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(3, "Este campo deve conter pelo menos 3 caracteres"),
  email: Schema.Types.StringType().isEmail("Email inválido"),
  phoneNumber: Schema.Types.StringType().minLength(11, "Telefone Inválido"),
  responsible: Schema.Types.StringType().minLength(
    3,
    "Este campo deve conter pelo menos 3 caracteres"
  ),
});

interface CompanyFormProps {
  companyId?: string | null | undefined;
}

export function CompanyForm(props: CompanyFormProps) {
  const { companyId } = props;
  const toasterStore = useStore(useToasterStore);
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});

  useEffect(() => {
    companyId && loadCompany(companyId);
  }, []);

  function loadCompany(companyId: string) {
    companyStore
      .get(companyId)
      .then((c) => setCompany(c))
      .catch((e) => toasterStore.error(e));
  }

  function handleChangeCompanyKey(key: string, val: any): void {
    setCompany({ ...company, [key]: val });
  }

  function handleSave(): void {
    if (!formRef.current.check()) {
      toasterStore.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setFormError({});

    companyStore
      .update(company)
      .then((updatedCompany) => {
        setCompany(updatedCompany);
        authStore.updateCompany(updatedCompany);
        toasterStore.success("Empresa atualizada com sucesso.");
      })
      .catch(toasterStore.error);
  }

  const subdomain = (process.env.REACT_APP_TENANT_URL as string).replace(
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
      onError={setFormError}
    >
      <PanelBase title="Dados da empresa">
        <InputText
          label="Nome (obrigatório)"
          value={company.name || ""}
          onChange={(val) => handleChangeCompanyKey("name", val)}
          error={formError.name}
        />
        <Row>
          <Form.ControlLabel>Subdomínio</Form.ControlLabel>
        </Row>
        <Row style={{ marginLeft: 3, marginBottom: 20 }}>
          <a rel="noopener noreferrer" href={subdomain} target="_blank">
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
            images={company.logo ? [company.logo] : []}
            onChange={(images) =>
              handleChangeCompanyKey("logo", images?.[0] || null)
            }
            disableAdd={Boolean(company.logo)}
          />
        </Row>
        <Row>
          <Form.ControlLabel>Imagens de capa</Form.ControlLabel>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <ImageGalery
            images={company.covers || []}
            onChange={(images) => handleChangeCompanyKey("covers", images)}
          />
        </Row>
        <InputText
          label={`Descrição (${company.description?.length || 0}/${2024})`}
          value={company.description || ""}
          error={formError.description}
          options={{ as: "textarea", rows: 5 }}
          onChange={(value) =>
            handleChangeCompanyKey("description", value.substring(0, 2024))
          }
        />
      </PanelBase>

      <PanelBase title="Localização">
        <AddressForm
          data={{ ...company }}
          error={formError}
          onChange={(data: any) => setCompany({ ...company, ...data })}
        />
      </PanelBase>
      <PanelBase title="Contato">
        <InputText
          label="Email"
          value={company.email || ""}
          onChange={(val) => handleChangeCompanyKey("email", val)}
          error={formError.email}
        />
        <InputPhoneNumber
          value={company.phoneNumber}
          error={formError.phoneNumber}
          onChange={(val) => handleChangeCompanyKey("phoneNumber", val)}
        />
        <InputText
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
        <SaveButton onClick={handleSave} />
      </FlexboxGrid>
    </Form>
  );
}
