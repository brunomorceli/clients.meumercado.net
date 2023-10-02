/* eslint-disable @next/next/no-img-element */
import { Nav, Navbar } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { GeneralUtils } from "@shared/utils";
import { useCompanyStore } from "@customers/stores";
import { CustomNavbar } from "./styles";
import { AppbarCategory } from "./AppbarCategory";

interface AppBarProps {
  title?: string;
  hideButton?: boolean | null | undefined;
}

export function AppBar(props: AppBarProps) {
  const router = useRouter();
  const companyStore = useStore(useCompanyStore);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  return (
    <CustomNavbar appearance="inverse">
      { companyStore.company.logo &&
        <img
          alt="logo"
          src={companyStore.company.logo}
          height={50}
          style={{ float: "left", margin: 5 }}
        />
      }
      <Navbar.Brand href="#">
        {companyStore.company.name || subdomain}
      </Navbar.Brand>
      <Nav>
        <Nav.Item eventKey="/customers" icon={<HomeIcon />} onClick={() => router.replace('/')}>
          Home
        </Nav.Item>
        {companyStore.company.categories.map((item, index) => <AppbarCategory key={index} item={item} onPick={(id) => console.log('selected category:', id)} />)}

      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </CustomNavbar>
  );
}
