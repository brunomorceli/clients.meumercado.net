import { GeneralUtils } from "@root/modules/shared";
import { PublicGuard } from "@shared/components";
import { useRouter } from "next/router";

export default function CustomersPage() {
  const router = useRouter();
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  if (!subdomain) {
    router.replace('/admins')
    return null;
  }
  
  return (
    <PublicGuard>
      <h5>Home - customers</h5>
    </PublicGuard>
  )
}
