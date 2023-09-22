import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect} from "react";
import { useStore } from "zustand";

export default function Entrar() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);

  useEffect(() => {
    authStore.setTenantId(null);
    router.replace('/entrar');
  }, []);

  return null;
}
