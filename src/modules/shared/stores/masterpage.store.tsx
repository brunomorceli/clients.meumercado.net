import { create } from "zustand";

interface useMasterpageStoreProps {
  appBar: boolean;
  drawer: boolean;
  setDrawer: (stat: boolean) => void;
  toggleDrawer: () => void;
  setAppBar: (stat: boolean) => void;
  toggleAppBar: () => void;
}

export const useMasterpageStore = create<useMasterpageStoreProps>((set) => ({
  appBar: false,
  drawer: false,
  setDrawer: (stat: boolean) => set((state) => ({ ...state, drawer: stat })),
  toggleDrawer: () => set((state) => ({ ...state, drawer: !state.drawer })),
  setAppBar: (stat: boolean) => set((state) => ({ ...state, appBar: stat })),
  toggleAppBar: () => set((state) => ({ ...state, appBar: !state.drawer })),
}));