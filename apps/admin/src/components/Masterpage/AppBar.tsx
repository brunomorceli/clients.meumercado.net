import { useStore } from "zustand";
import { AppBarComp, AppBarMenuBtn, AppBarTitle } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import { useMasterpageStore } from "@/stores";

interface AppBarProps {
  title?: string;
  hideButton?: boolean | null | undefined;
}

export function AppBar (props: AppBarProps) {
  const masterpageStore = useStore(useMasterpageStore);

  return (
    <AppBarComp>
      {!props.hideButton &&
        <AppBarMenuBtn onClick={masterpageStore.toggleDrawer}>
          <MenuOutlined />
        </AppBarMenuBtn>
      }
      <AppBarTitle level={4}>
        {props.title || 'N/A'}
      </AppBarTitle>
    </AppBarComp>
  );
}