/* eslint-disable @next/next/no-img-element */
import { Col, FlexboxGrid, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { GeneralUtils } from "@shared/utils";
import { useCompanyStore } from "@customers/stores";
import { CustomNavbar } from "./styles";
import { AppbarCategory } from "./AppbarCategory";
import { ProductAutocomplete } from "..";

interface AppBarProps {
  title?: string;
  hideButton?: boolean | null | undefined;
}

export function AppBar(props: AppBarProps) {
  const router = useRouter();
  const companyStore = useStore(useCompanyStore);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  return (
    <>
      <CustomNavbar>
        <Nav>
          {companyStore.company.logo ? (
            <Nav.Item onClick={() => router.replace("/")}>
              <img
                alt="logo"
                src={companyStore.company.logo}
                height={90}
                style={{ display: "flex", flexDirection: "column", margin: 5 }}
              />
            </Nav.Item>
          ) : (
            <h5>{companyStore.company.name}</h5>
          )}
          {companyStore.company.categories.map((item, index) => (
            <AppbarCategory
              key={index}
              item={item}
              onPick={(id) => console.log("selected category:", id)}
            />
          ))}
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<CogIcon />}>Configurações</Nav.Item>
        </Nav>
        <Col xs={24}>
          <FlexboxGrid justify="center" style={{ margin: 10 }}>
            <Col xs={24} sm={24} md={18} lg={12} xl={12} xxl={12}>
              <ProductAutocomplete
                onPick={(p) => console.log("selected product:", p)}
              />
            </Col>
          </FlexboxGrid>
        </Col>
      </CustomNavbar>
    </>
  );
}
