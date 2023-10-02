import { useAuthStore as useAdminUseAuthGuard } from "@admins/stores";
import { useAuthStore as useCustomerUseAuthGuard } from "@customers/stores";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { GeneralUtils } from "..";

export function PublicGuard(props: any) {
  const router = useRouter();
  const adminAuthStore = useStore(useAdminUseAuthGuard);
  const customerAuthStore = useStore(useCustomerUseAuthGuard);
  const subdomain = GeneralUtils.getSubdomain(window.location.href);
  const isAuth = subdomain ? customerAuthStore.authenticated : adminAuthStore.authenticated;

  isAuth && router.replace(Boolean(subdomain) ? '/customers' : '/admins');
  
  return !isAuth && props.children;
}
