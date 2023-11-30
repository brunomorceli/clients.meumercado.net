import { Col, Grid } from "rsuite";
import { WebMasterpage } from "..";
import { ReactNode, useEffect } from "react";
import { MobileMasterpage } from "./Mobile";
import { useStore } from "zustand";
import { useCompanyStore } from "src/modules/customers/stores";

interface CustomerMasterpageProps {
  children: ReactNode;
}

export function CustomerMasterpage(props: CustomerMasterpageProps) {
  const companyStore = useStore(useCompanyStore);
  const { theme } = companyStore.company;

  useEffect(() => {
    setCssProperty('--primary-color', theme?.primaryColor!);
    setCssProperty('--secondary-color', theme?.secondaryColor!);
    setCssProperty('--highlight-color', theme?.highlightColor!);
    setCssProperty('--text-color', theme?.textColor!);
    setCssProperty('--background-color', theme?.backgroundColor!);
    setCssProperty('--header-text-color', theme?.headerTextColor!);
    setCssProperty('--title-text-color', theme?.titleTextColor!);
    setCssProperty('--panel-text-color', theme?.panelTextColor!);
    setCssProperty('--panel-background-color', theme?.panelBackgroundColor!);
  }, []);

  function setCssProperty(name: string, value: string): void {
    window.document.documentElement.style.setProperty(name, value);;
  }

  return (
    <>
      <Grid style={{ width: '100%', margin: 0, padding: 0, backgroundColor: 'var(--background-color)' }}>
        <Col xsHidden smHidden mdHidden lg={24} xl={24} xxl={24} style={{ border: 0, padding: 0 }}>
          <WebMasterpage>{props.children}</WebMasterpage>
        </Col>
        <Col xs={24} sm={24} md={24} lgHidden xlHidden xxlHidden style={{ border: 0, padding: 0 }}>
          <MobileMasterpage>{props.children}</MobileMasterpage>
        </Col>
      </Grid>
    </>
  );
}
