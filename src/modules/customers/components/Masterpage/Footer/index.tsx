import { useStore } from "zustand";
import { FooterContainer } from "./styles";
import { useCompanyStore } from "src/modules/customers/stores";
import { Button } from "rsuite";
import { GeneralUtils } from "src/modules/shared";

export function Footer() {
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const year = new Date().getFullYear().toString();

  return (
    <FooterContainer>
      <h5>
        Copyright {company.name || "N/I"} {year}. Todos os direitos reservados.
      </h5>
      <p>
        Contato - Email: {company.email}
        {company.phoneNumber ? `, - Telefone: ${GeneralUtils.maskPhonenumber(company.phoneNumber)}` : null}
      </p>
      <p>
        Endereço: &nbsp;{company.address}, &nbsp;
        {company.addressNumber || "S/N"}, &nbsp;{company.city} - {company.state}
        &nbsp;CEP: {company.cep}.
      </p>
      <Button
        appearance="subtle"
        onClick={() => window.open("https://meumercado.com.br", "_blank")}
      >
        created by Meumercado
      </Button>
    </FooterContainer>
  );
}
