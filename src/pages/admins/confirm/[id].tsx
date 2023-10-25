import { Confirm } from "@admins/components/Confirm";
import { PublicGuard } from "@shared/components";
import { useRouter } from "next/router";

export default function ConfirmPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PublicGuard>
      <Confirm authId={id as string} />
    </PublicGuard>
  );
}
