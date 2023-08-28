import { useStore } from "zustand";
import { AppBarComp, AppBarMenuBtn, AppBarTitle } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import { useMasterpageStore } from "@/stores";

interface AppBarProps {
  title?: string;
}

export function AppBar (props: AppBarProps) {
  const masterpageStore = useStore(useMasterpageStore);

  return (
    <AppBarComp>
      <AppBarMenuBtn onClick={masterpageStore.toggleDrawer}>
        <MenuOutlined />
      </AppBarMenuBtn>
      <AppBarTitle level={4}>
        {props.title || 'N/A'}
      </AppBarTitle>
    </AppBarComp>
  );
}