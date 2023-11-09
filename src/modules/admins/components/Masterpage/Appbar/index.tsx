import { Badge, Button, FlexboxGrid, Stack } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useUserStore } from "@admins/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";
import NoticeIcon from "@rsuite/icons/Notice";
import { useEffect, useState } from "react";
import { DrawerNotifications } from "@shared/components";
import { useRouter } from "next/router";
import { ENotificationTypeHandler } from "@shared/enums";
import { INotification } from "@shared/interfaces";
import { CustomHeader, HomeButtom } from "./styles";

interface AppbarProps {
  onHome?: () => void;
  onMenu?: () => void;
}

const btStyle = {
  height: 64,
  borderRadius: 0,
  width: 64,
};

export function Appbar(props: AppbarProps) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const isAuth = authStore.authenticated;
  const userStore = useStore(useUserStore);
  const { notifications } = userStore;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    userStore.update();
  }, []);

  function handlePick(notification: INotification): void {
    router.replace(ENotificationTypeHandler.adminPath(notification));
    handleClose();
  }

  function handleClose(): void {
    setOpen(false);
    userStore.checkAsMarked();
  }

  const unread = notifications.filter((n) => !n.viewed) || [];
  return (
    <>
      <CustomHeader style={{ height: 64 }}>
        <FlexboxGrid>
          {props.onMenu && (
            <Button style={btStyle} appearance="subtle" onClick={props.onMenu}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          )}

          <HomeButtom
            appearance="subtle"
            onClick={props.onHome}
            startIcon={<FontAwesomeIcon icon={faHouse} />}
          >
            {isAuth
              ? authStore.companyName.toUpperCase()
              : process.env.NEXT_PUBLIC_APP_NAME}
          </HomeButtom>
          <Stack.Item flex={1}>
            <Stack justifyContent="flex-end">
              <Button
                style={btStyle}
                appearance="subtle"
                onClick={() => setOpen(true)}
              >
                <NoticeIcon />
                {unread.length !== 0 && <Badge content={unread.length} />}
              </Button>
            </Stack>
          </Stack.Item>
        </FlexboxGrid>
      </CustomHeader>
      <DrawerNotifications
        open={open}
        notifications={notifications}
        onClose={handleClose}
        onPick={handlePick}
      />
    </>
  );
}
