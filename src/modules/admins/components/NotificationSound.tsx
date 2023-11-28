import { useStore } from "zustand";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "src/modules/admins/stores";

export function NotificationSound() {
  const userStore = useStore(useUserStore);
  const [last, setLast] = useState<number>(userStore.last);
  const audioRef = useRef<any>();

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
