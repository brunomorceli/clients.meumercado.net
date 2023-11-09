import { useRouter } from "next/router";
import { Drawer } from "rsuite";
import { MenuContent } from "./Content";

interface MenuMobileProps {
  open: boolean;
  onClose: () => void;
  onSignout: () => void;
}

export function MenuMobile(props: MenuMobileProps) {
  const router = useRouter();

  function handleGoTo(path: string): void {
    router.replace(path);
    props.onClose();
  }

  return (
    <Drawer placement="left" size="full" open={props.open} onClose={props.onClose}>
      <MenuContent onSignout={props.onSignout} onGo={handleGoTo} />
    </Drawer>
  );
}
