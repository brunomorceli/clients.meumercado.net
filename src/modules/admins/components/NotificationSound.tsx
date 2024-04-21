/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from "zustand";
import { useEffect, useRef, useState } from "react";
import { useAuthStore, useUserStore } from "src/modules/admins/stores";

export function NotificationSound() {
  const authStore = useStore(useAuthStore);
  const userStore = useStore(useUserStore);
  const [last, setLast] = useState<number>(userStore.last);
  const audioRef = useRef<any>();

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      authStore.plan?.isActive && userStore.update();
    }, 15000);

    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  useEffect(() => {
    if (last !== userStore.last) {
      play();
    }

    setLast(userStore.last);
  }, [userStore.last]);

  function play() {
    const audio = audioRef.current;

    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    audio.play();
  }

  return (
    <audio ref={audioRef} src="/audios/ding.mp3" style={{ display: "none" }} />
  );
}
