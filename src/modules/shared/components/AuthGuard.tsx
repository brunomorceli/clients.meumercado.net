import { useAuthStore as useAdminUseAuthGuard } from "@admins/stores";
import { useAuthStore as useCustomerUseAuthGuard } from "@customers/stores";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { GeneralUtils } from "..";
import { useEffect } from "react";

export function AuthGuard(props: any) {
  const router = useRouter();
  const adminAuthStore = useStore(useAdminUseAuthGuard);
  const customerAuthStore = useStore(useCustomerUseAuthGuard);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);
  const isAuth = subdomain ? customerAuthStore.authenticated : adminAuthStore.authenticated;

  useEffect(() => {
    if (!isAuth) {
      router.replace(Boolean(subdomain) ? '/customers/signin' : '/admins/signin');
    }
  }, [])
  
  return isAuth && props.children;
}
