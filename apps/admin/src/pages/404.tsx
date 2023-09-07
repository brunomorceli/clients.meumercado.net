import { useAuthStore } from "@/stores";
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
      router.replace('/admins/confirm');
    }
  });

  return null;
}