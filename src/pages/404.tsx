import { GeneralUtils } from "@root/modules/shared";
import { useAuthStore } from "@shared/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function NotFound() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  useEffect(() => {
    if (authStore.authenticated) {
      router.replace(subdomain ? '/' : '/admins');
    } else {
      router.replace('/admins/signin');
    }
  });

  return null;
}