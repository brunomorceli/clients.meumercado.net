import { create } from "zustand";

interface useMasterpageStoreProps {
  cart: boolean;
  login: boolean;
  setLogin: (stat: boolean) => void;
  toggleLogin: () => void;
  setCart: (stat: boolean) => void;
  toggleCart: () => void;
}

export const useMasterpageStore = create<useMasterpageStoreProps>((set) => ({
  cart: false,
  login: false,
  setCart: (stat: boolean) => set((state) => ({ ...state, cart: stat })),
  toggleCart: () => set((state) => ({ ...state, cart: !state.cart })),
  setLogin: (stat: boolean) => set((state) => ({ ...state, login: stat })),
  toggleLogin: () => set((state) => ({ ...state, login: !state.login })),
}));