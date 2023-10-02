import { GeneralUtils } from "@root/modules/shared";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  useEffect(() => {
    if (subdomain) {
      router.replace('/');
    } else {
      router.replace('/admins');
    }
  });

  return null;
}