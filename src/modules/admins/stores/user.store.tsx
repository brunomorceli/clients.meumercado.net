import { INotification } from "src/modules/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserService } from "src/modules/admins/services";

interface useUserStoreProps {
  notifications: INotification[];
  last: number;
  update: () => void;
  checkAsMarked: () => void;
}

export const useUserStore = create(
  persist<useUserStoreProps>(
    (set, get) => ({
      notifications: [],
      last: 0,

      update: () => {
        const cache = get();
        let last = 0;

        if (cache.notifications.length !== 0) {
          last = cache.notifications[0].id;
        }

        UserService.findNotification(last)
          .then((list) => {
            set({
              ...cache,
              notifications: [...list, ...cache.notifications],
              last: list.length !== 0 ? list[0].id : cache.last,
            });
          })
          .catch(() => null);
      },

      checkAsMarked: () => {
        const cache = get();
        set({
          ...cache,
          notifications: cache.notifications.map((n) => ({
            ...n,
            viewed: true,
          })),
        });
      },
    }),

    { name: "admins-users-store" }
  )
);
