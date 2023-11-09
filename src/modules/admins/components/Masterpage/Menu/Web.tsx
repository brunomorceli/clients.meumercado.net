import { useMasterpageStore } from "@admins/stores";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import { SidenavContainer } from "./styles";
import { MenuContent } from "./Content";

interface MenuWebProps {
  onSignout: () => void;
}

export function MenuWeb(props: MenuWebProps) {
  const router = useRouter();
  const masterpageStore = useStore(useMasterpageStore);

  function handleGoTo(path: string): void {
    router.replace(path);
    masterpageStore.toggleDrawer();
  }

  return (
    <SidenavContainer>
      <MenuContent onGo={handleGoTo} onSignout={props.onSignout} />
    </SidenavContainer>
  );
}
