import { useAuthStore } from "@shared/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";
import { GeneralUtils } from "..";

export function PublicGuard(props: any) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  useEffect(() => {
    if (authStore.authenticated) {
      router.replace(subdomain ? '/' : '/admins');
    }
  }, [authStore, router, subdomain]);
  
  return !authStore.authenticated ? props.children : null;
}
