import { AuthService } from "@/services";
import { create } from "zustand";

interface useAuthStoreProps {
  authenticate: (email: string, label?: string) => Promise<any>;
}

export const useAuthStore = create<useAuthStoreProps>(() => ({
  authenticate: (email: string, label?: string) => AuthService.authenticate(email, label),
}));
