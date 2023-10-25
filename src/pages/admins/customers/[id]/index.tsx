import { AuthGuard } from "@shared/components";
import { CustomerForm } from "@admins/components";
import { useRouter } from "next/router";

export default function CustomersPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>
      <CustomerForm userId={id as string} />
    </AuthGuard>
  )
}
