import { GeneralUtils } from "@root/modules/shared";
import { useRouter } from "next/router";

export default function ProductsPage() {
  const router = useRouter();
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  router.replace(Boolean(subdomain) ? '/customers' : '/landingpage');

  return null;
}
