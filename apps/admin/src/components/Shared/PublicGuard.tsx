import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export function PublicGuard(props: any) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);

  useEffect(() => {
    if (authStore.authenticated) {
      router.replace('/');
    }
  }, [authStore, router]);
  
  return !authStore.authenticated ? props.children : null;
}
