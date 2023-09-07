import { Confirm } from "@/components/Confirm";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useStore } from "zustand";

export default function ConfirmPage() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);

  if (authStore.authenticated) {
    router.replace('/');
    return null;
  }

  return <Confirm />;
}