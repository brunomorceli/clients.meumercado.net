import { useStore } from "zustand";
import {
  AppBarComp,
  AppBarLeftActions,
  AppBarMenuBtn,
  AppBarTitle,
} from "./styles";
import { HomeFilled, MenuOutlined } from "@ant-design/icons";
import { useMasterpageStore } from "@/stores";
import { Button } from "antd";
import { useRouter } from "next/router";

interface AppBarProps {
  title?: string;
  hideButton?: boolean | null | undefined;
}

export function AppBar(props: AppBarProps) {
  const router = useRouter();
  const masterpageStore = useStore(useMasterpageStore);

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
        <AppBarLeftActions></AppBarLeftActions>
      </AppBarTitle>
    </AppBarComp>
  );
}
