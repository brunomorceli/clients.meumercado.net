import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export function AuthGuard(props: any) {
  const authStore = useStore(useAuthStore);
  const router = useRouter();

  useEffect(() => {
    if (!authStore.authenticated) {
      router.replace('/signin');
    }
  }, [authStore, router]);
  
  return authStore.authenticated ? props.children : null;
}
