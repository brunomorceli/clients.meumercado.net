import { useStore } from "zustand";
import { useUserStore } from "../stores";
import { useEffect, useState } from "react";

export function Notifications() {
  const userStore = useStore(useUserStore);
  const [last, setLast] = useState<number>(userStore.last);

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      userStore.update();
    }, 15000);

    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  useEffect(() => {
    if (last !== userStore.last) {
      console.log('ding');
    }

    setLast(userStore.last);
  }, [userStore.last]);

  return null;
}
