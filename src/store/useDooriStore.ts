import { DEFAULT_WEDDING_TIMELINE } from "@/data/weddingChecklist";
import { ChecklistItem, UserInput } from "@/types/doori";
import { parseDDay } from "@/utils/date";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DooriStoreState {
    weddingDate: string;
    budgetInManwon: string;
    location: string;
    guestCount: number;
    budgetTier: UserInput["budgetTier"];
    completedIds: string[];
    checkList: ChecklistItem[];

    setWeddingDate: (value: string) => void;
    setBudgetInManwon: (value: string) => void;
    setLocation: (location: string) => void;
    setGuestCount: (guestCount: number) => void;
    setBudgetTier: (budgetTier: UserInput["budgetTier"]) => void;
    toggleChecklist: (id: string) => void;
    getPastTasks: (currentDDay: number) => ChecklistItem[];
    getUpcomingTasks: (currentDDay: number) => ChecklistItem[];
}

export const useDooriStore = create<DooriStoreState>()(
    persist(
        (set, get) => ({
            weddingDate: "",
            budgetInManwon: "",
            location: "",
            guestCount: 0,
            budgetTier: "표준",
            completedIds: [],
            checkList: DEFAULT_WEDDING_TIMELINE,
        
            setWeddingDate: weddingDate => set({ weddingDate }),
            setBudgetInManwon: budgetInManwon => set({ budgetInManwon }),
            setLocation: location => set({ location }),
            setGuestCount: guestCount => set({ guestCount }),
            setBudgetTier: budgetTier => set({ budgetTier }),
            toggleChecklist: id => set(state => ({
                checkList: state.checkList.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
            })),
            getPastTasks: currentDDay => {
                const { checkList } = get();
                return checkList.filter(item => {
                    const itemDDay = parseDDay(item.dDay12m);
        
                    return itemDDay >= currentDDay;
                })
            },
            getUpcomingTasks: currentDDay => {
                const { checkList } = get();
                return checkList.filter(item => {
                    const itemDDay = parseDDay(item.dDay12m);
        
                    return itemDDay < currentDDay;
                })
            }
        }),
        {
            name: "doori-storage",
        }
    )
)