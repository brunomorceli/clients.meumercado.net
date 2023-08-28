import { useUserStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function NotFound() {
  const router = useRouter();
  const userStore = useStore(useUserStore);

  useEffect(() => {
    if (userStore.authenticated) {
      router.replace('/');
    } else {
      router.replace('/signin');
    }
  });

  return null;
}