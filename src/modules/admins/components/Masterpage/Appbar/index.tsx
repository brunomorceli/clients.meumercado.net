/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, FlexboxGrid, Stack } from "rsuite";
import { useStore } from "zustand";
import { useAuthStore, useUserStore } from "src/modules/admins/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { DrawerNotifications } from "src/modules/shared/components";
import { useNavigate } from "react-router";
import { ENotificationTypeHandler } from "src/modules/shared/enums";
import { INotification } from "src/modules/shared/interfaces";
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
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const isAuth = authStore.authenticated;
  const userStore = useStore(useUserStore);
  const { notifications } = userStore;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    userStore.update();
  }, []);

  function handlePick(notification: INotification): void {
    navigate(ENotificationTypeHandler.adminPath(notification));
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
              <FontAwesomeIcon icon={faBars} style={{ fontSize: 20 }} />
            </Button>
          )}

          <HomeButtom
            appearance="subtle"
            onClick={props.onHome}
            startIcon={
              <FontAwesomeIcon icon={faHouse} style={{ fontSize: 20 }} />
            }
          >
            ADMIN -
            {isAuth
              ? authStore.companyName.toUpperCase()
              : process.env.REACT_APP_APP_NAME}
          </HomeButtom>
          <Stack.Item flex={1}>
            {authStore.subscription?.isActive && (
              <Stack justifyContent="flex-end">
                <Button
                  style={btStyle}
                  appearance="subtle"
                  onClick={() => setOpen(true)}
                >
                  <FontAwesomeIcon icon={faBell} style={{ fontSize: 20 }} />
                  {unread.length !== 0 && <Badge content={unread.length} />}
                </Button>
              </Stack>
            )}
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
