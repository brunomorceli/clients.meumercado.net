import { AuthGuard } from "@shared/components";
import { CustomerDetails } from "@admins/components";
import { useRouter } from "next/router";

export default function CustomersPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>
      <CustomerDetails userId={id as string} />
    </AuthGuard>
  )
}
