import { Badge, Button, Col, FlexboxGrid, Header, Stack } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useUserStore } from "@admins/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NoticeIcon from "@rsuite/icons/Notice";
import { useEffect, useState } from "react";
import { DrawerNotifications } from "./DrawerNotifications";
import { useRouter } from "next/router";
import { ENotificationTypeHandler, INotification } from "@root/modules/shared";

interface AppbarProps {
  onHome?: () => void;
}

const btStyle = {
  height: 64,
  borderRadius: 0,
  width: "100%",
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
      <Header style={{ height: 64 }}>
        <FlexboxGrid>
          <Col md={6} lg={6} xl={4} xxl={4} style={{ padding: 0, margin: 0 }}>
            <Button
              style={btStyle}
              appearance="subtle"
              onClick={props.onHome}
              startIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              {isAuth
                ? authStore.companyName.toUpperCase()
                : process.env.NEXT_PUBLIC_APP_NAME}
            </Button>
          </Col>
          <Stack.Item flex={1}>
            <Stack justifyContent="flex-end">
              <Button
                style={btStyle}
                appearance="subtle"
                startIcon={<NoticeIcon />}
                onClick={() => setOpen(true)}
              >
                Notificações &nbsp;
                {unread.length !== 0 && <Badge content={unread.length} />}
              </Button>
            </Stack>
          </Stack.Item>
        </FlexboxGrid>
      </Header>
      <DrawerNotifications
        open={open}
        notifications={notifications}
        onClose={handleClose}
        onPick={handlePick}
      />
    </>
  );
}
