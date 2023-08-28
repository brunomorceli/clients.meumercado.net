import { useUserStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export function AuthGuard(props: any) {
  const userStore = useStore(useUserStore);
  const router = useRouter();

  useEffect(() => {
    if (!userStore.authenticated) {
      router.replace('/signin');
    }
  }, [userStore, router]);
  
  return userStore.authenticated ? props.children : null;
}
