import { useAuthStore } from "@/stores";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function NotFound() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);

  useEffect(() => {
    if (authStore.authenticated) {
      router.replace('/');
    } else {
      window.location.assign(`${process.env.NEXT_PUBLIC_LANDINGPAGE_URL}/entrar`);
    }
  });

  return null;
}