import { Confirm } from "@/components/Confirm";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useStore } from "zustand";

export default function ConfirmPage() {
  const authStore = useStore(useAuthStore);
  const router = useRouter();
  const { id } = router.query;
  const cancelURL = `${process.env.NEXT_PUBLIC_LANDINGPAGE_URL}/sair`;

  if (authStore.authenticated) {
    router.replace("/");
    return null;
  }

  return (
    <Confirm
      authId={id as string}
      onCancel={() => window.location.assign(cancelURL)}
    />
  );
}
