import { Confirm } from "@admins/components/Confirm";
import { PublicGuard } from "@shared/components";
import { useAuthStore } from "@shared/stores";
import { useRouter } from "next/router";
import { useStore } from "zustand";

export default function ConfirmPage() {
  const authStore = useStore(useAuthStore);
  const router = useRouter();
  const { id } = router.query;

  if (authStore.authenticated) {
    router.replace("/");
    return null;
  }

  return (
    <PublicGuard>
      <Confirm
        authId={id as string}
        onCancel={() => router.replace('/admins/signin')}
      />
    </PublicGuard>
  );
}
