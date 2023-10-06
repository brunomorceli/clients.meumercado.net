import { Button, Nav, Navbar, Sidebar, Sidenav } from "rsuite";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useCompanyStore } from "@customers/stores";
import { AppbarCategory } from "./AppbarCategory";
import { CustomSidebar } from "./styles";

export function SidebarComp() {
  const router = useRouter();
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;

  return (
    <CustomSidebar xsHidden smHidden md={4} lg={4} xl={4} xxl={4}>
      <Sidebar>
            <Nav vertical  style={{ width: '100%' }}>
              {company.categories.map((item, index) => (
                <AppbarCategory
                  key={index}
                  item={item}
                  onPick={(id) =>
                    router.replace(`/customers/products/categories/${id}`)
                  }
                />
              ))}
            </Nav>

      </Sidebar>
    </CustomSidebar>
  );
}
