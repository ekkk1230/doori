import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiStoreState {
    isOnboarded: boolean;

    setIsOnboarded: (status: boolean) => void
}

export const useUiStore = create<UiStoreState>()(
    persist(
      (set) => ({
        isOnboarded: false, 
        setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
      }),
      {
        name: "doori-ui-storage",
      }
    )
  );