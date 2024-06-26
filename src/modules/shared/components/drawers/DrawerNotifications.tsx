import { useStore } from "zustand";
import { Drawer } from "rsuite";
import { useUserStore } from "src/modules/admins/stores";
import { INotification, GeneralUtils } from "src/modules/shared";

interface DrawerNotificationsProps {
  open?: boolean;
  notifications: INotification[];
  onPick: (notification: INotification) => void;
  onClose: () => void;
}

export function DrawerNotifications(props: DrawerNotificationsProps) {
  const userStore = useStore(useUserStore);
  const { notifications } = userStore;

  return (
    <Drawer
      style={{ minWidth: "25vw", maxWidth: "300px" }}
      open={props.open}
      onClose={props.onClose}
    >
      <Drawer.Header>
        <Drawer.Title>
          Notificações ({notifications.filter((n) => !n.viewed).length})
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body style={{ padding: 20 }}>
        {notifications.map((item, index) => (
          <div
            key={index}
            style={{ marginTop: 10, marginBottom: 10, cursor: "pointer" }}
            onClick={() => props.onPick(item)}
          >
            <div style={{ color: "--text-color", fontWeight: 500 }}>
              {item.label}
            </div>
            <div>
              <strong style={{ color: "grey", fontSize: 14 }}>
                {GeneralUtils.localTime(item.createdAt, true)}
              </strong>
            </div>
            <hr />
          </div>
        ))}
      </Drawer.Body>
    </Drawer>
  );
}
