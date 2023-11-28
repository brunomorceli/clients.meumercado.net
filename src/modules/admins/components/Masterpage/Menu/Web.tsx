import { useMasterpageStore } from "src/modules/admins/stores";
import { useStore } from "zustand";
import { useNavigate } from 'react-router';
import { SidenavContainer } from "./styles";
import { MenuContent } from "./Content";

interface MenuWebProps {
  onSignout: () => void;
}

export function MenuWeb(props: MenuWebProps) {
  const navigate = useNavigate();
  const masterpageStore = useStore(useMasterpageStore);

  function handleGoTo(path: string): void {
    navigate(path);
    masterpageStore.toggleDrawer();
  }

  return (
    <SidenavContainer>
      <MenuContent onGo={handleGoTo} onSignout={props.onSignout} />
    </SidenavContainer>
  );
}
