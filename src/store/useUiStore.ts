import { create } from "zustand";

type TabType = "onboarding" | "planTab";

interface UiStoreState {
    activeTab: TabType;

    setActiveTab: (tab: TabType) => void
}

export const useUiStore = create<UiStoreState>((set) => ({
    activeTab: "onboarding",
    
    setActiveTab: activeTab => set({ activeTab }),
}))