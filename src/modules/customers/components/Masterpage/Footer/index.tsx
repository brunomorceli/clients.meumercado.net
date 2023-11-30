import { useStore } from "zustand";
import { FooterContainer } from "./styles";
import { useCompanyStore } from "src/modules/customers/stores";
import { Button } from "rsuite";

export function Footer() {
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const year = new Date().getFullYear().toString();
  
  return (
    <FooterContainer>
      <h5>Copyright {company.name || 'N/I'} {year}. Todos os direitos reservados.</h5>
      <p>
        Contato - Email: {company.email}
        {company.phoneNumber ? `, - Telefone: ${company.phoneNumber}` : null}
      </p>
      <p>
        Endereço:
        &nbsp;{company.address},
        &nbsp;{company.addressNumber ||  'S/N'},
        &nbsp;{company.city} - {company.state}
        &nbsp;CEP: {company.cep}.
        
       - Endereço: {company.address}</p>
      <Button appearance="subtle">created by Nearstore</Button>
    </FooterContainer>
  );
}