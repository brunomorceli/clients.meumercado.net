import { useAuthStore } from "@/stores";
import { useEffect } from "react";
import { useStore } from "zustand";

export function AuthGuard(props: any) {
  const authStore = useStore(useAuthStore);

  useEffect(() => {
    if (!authStore.authenticated) {
      window.location.assign(`${process.env.NEXT_PUBLIC_LANDINGPAGE_URL}/sair`);
    }
  }, [authStore]);
  
  return authStore.authenticated ? props.children : null;
}
