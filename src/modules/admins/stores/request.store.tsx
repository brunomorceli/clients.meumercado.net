import { create } from "zustand";

interface useRequestStoreProps {
  errorStatus: number;
  setError: (status: number) => void;
}

export const useRequestStore = create<useRequestStoreProps>((set) => ({
  errorStatus: 0,
  setError: (errorStatus: number) =>
    set((state) => ({ ...state, errorStatus })),
}));
