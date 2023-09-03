import { useStore } from "zustand";
import {
  AppBarComp,
  AppBarLeftActions,
  AppBarMenuBtn,
  AppBarTitle,
  CustomSelect,
} from "./styles";
import {
  HomeFilled,
  HomeOutlined,
  MenuOutlined,
  RightOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useAuthStore, useMasterpageStore } from "@/stores";
import { Button, Select } from "antd";
import { useRouter } from "next/router";

interface AppBarProps {
  title?: string;
  hideButton?: boolean | null | undefined;
}

export function AppBar(props: AppBarProps) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const masterpageStore = useStore(useMasterpageStore);

  const companies = authStore.auth.companies;
  const selectedCompany = authStore.auth.selectedCompany;
  console.log(router);
  const routeTitles = {
    "/": "",
    "/companies": "Minhas empresas",
  };

  function getRouteTitle(pathname: string): string {
    switch (pathname) {
      case "/companies":
        return "Empresas";
      default:
        return "";
    }
  }

  const routeTitle = getRouteTitle(router.pathname);
  return (
    <AppBarComp>
      {!props.hideButton && (
        <AppBarMenuBtn onClick={masterpageStore.toggleDrawer}>
          <MenuOutlined />
        </AppBarMenuBtn>
      )}
      <AppBarTitle level={4}>
        <Button
          title={props.title}
          icon={<HomeFilled />}
          type="text"
          size="large"
          style={{ color: "inherit", marginTop: -5 }}
          onClick={() => router.replace("/")}
        >
          {props.title}
        </Button>
        <AppBarLeftActions>
          {selectedCompany && (
            <>
              <ShopOutlined />
              &nbsp;
              <CustomSelect
                style={{ backgroundColor: "inherit" }}
                defaultValue={selectedCompany.id}
                options={companies.map((c) => ({
                  label: c.label,
                  value: c.id,
                }))}
                onChange={(companyId: any) =>
                  authStore.setSelectedCompany(companyId)
                }
              />
            </>
          )}
        </AppBarLeftActions>
      </AppBarTitle>
    </AppBarComp>
  );
}
