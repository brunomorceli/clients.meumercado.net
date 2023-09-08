import { AuthService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAuthStoreProps {
  tenantId: string | null,
  setTenantId: (tenantId: string | null) => void;
  authenticate: (email: string, label?: string) => Promise<any>;
}

export const useAuthStore = create(
  persist<useAuthStoreProps>(
    (set, get) => ({
      tenantId: null,
      setTenantId: (tenantId: string | null) => set({ ...get(), tenantId }),
      authenticate: (email: string, label?: string) => AuthService.authenticate(email, label),
    }),
    { name: "auth-store" }
  )
);
