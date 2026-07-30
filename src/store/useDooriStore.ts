import { UserInput } from "@/types/doori";
import { create } from "zustand";

interface DooriStoreState {
    weddingDate: string;
    budgetInManwon: string;
    location: string;
    guestCount: number;
    budgetTier: UserInput["budgetTier"];
    completedIds: string[];

    setWeddingDate: (value: string) => void;
    setBudgetInManwon: (value: string) => void;
    setLocation: (location: string) => void;
    setGuestCount: (guestCount: number) => void;
    setBudgetTier: (budgetTier: UserInput["budgetTier"]) => void;
    toggleChecklist: (id: string) => void;
}

export const useDooriStore = create<DooriStoreState>((set) => ({
    weddingDate: "",
    budgetInManwon: "",
    location: "",
    guestCount: 0,
    budgetTier: "표준",
    completedIds: [],

    setWeddingDate: weddingDate => set({ weddingDate }),
    setBudgetInManwon: budgetInManwon => set({ budgetInManwon }),
    setLocation: location => set({ location }),
    setGuestCount: guestCount => set({ guestCount }),
    setBudgetTier: budgetTier => set({ budgetTier }),
    toggleChecklist: id => {},
}))