import { DEFAULT_BUDGET_TEMPLATE } from "@/data/budgetTemplate";
import { DEFAULT_WEDDING_TIMELINE } from "@/data/weddingChecklist";
import { Checklist, Budget } from "@/types/doori";
import { parseDDay } from "@/utils/date";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DooriStoreState {
    weddingDate: string;
    totalBudget: number;
    totalSpent: number;
    diffBudget: number;
    location: string;
    guestCount: number;
    budgetTier: Budget.UserInput["budgetTier"];
    completedIds: string[];
    checkList: Checklist.Item[];
    budgetItems: Budget.Item[];

    setWeddingDate: (value: string) => void;
    setTotalBudget: (value: number) => void;
    setLocation: (location: string) => void;
    setGuestCount: (guestCount: number) => void;
    setBudgetTier: (budgetTier: Budget.UserInput["budgetTier"]) => void;
    toggleChecklist: (id: string) => void;
    getPastTasks: (currentDDay: number) => Checklist.Item[];
    getUpcomingTasks: (currentDDay: number) => Checklist.Item[];
    setBudgetItems: (items: Budget.Item[]) => void;
    updateBudgetItem: (id: string, field: "targetAmount" | "actualAmount", value: number | null) => void;
    initBudgetItems: () => void;
    updateBudgetRatios: (newRatios: Record<string, number>) => void;
    calculateBudgetSummary: () => { totalSpent: number; diffBudget: number; };
}

export const useDooriStore = create<DooriStoreState>()(
    persist(
        (set, get) => {
            const calcSummary = (items: Budget.Item[], total: number) => {
                const rawSpentSum = items.reduce((acc, cur) => acc + (cur.actualAmount || 0), 0);
                const spent = rawSpentSum > 0 ? Math.round(rawSpentSum / 10000) : 0;
                const diff = total - spent;

                return { totalSpent: spent, diffBudget: diff };
            };

            return {
                weddingDate: "",
                totalBudget: 0,
                totalSpent: 0,
                diffBudget: 0,
                location: "",
                guestCount: 0,
                budgetTier: "표준",
                completedIds: [],
                checkList: DEFAULT_WEDDING_TIMELINE,
                budgetItems: DEFAULT_BUDGET_TEMPLATE,
            
                setWeddingDate: weddingDate => set({ weddingDate }),
                
                setTotalBudget: totalBudget => set(state => {
                    const summary = calcSummary(state.budgetItems, totalBudget);
                    return { totalBudget, ...summary };
                }),

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
                        const isUpcoming = itemDDay < currentDDay;
                        const isOverdueEssential = itemDDay >= currentDDay && !item.completed && item.isEssential;
                        const isInitialEssential = itemDDay > currentDDay && item.isEssential;
            
                        return (isUpcoming || isOverdueEssential || isInitialEssential);
                    })
                },

                setBudgetItems: budgetItems => set(state => {
                    const summary = calcSummary(budgetItems, state.totalBudget);
                    return { budgetItems, ...summary };
                }),

                updateBudgetItem: (id, field, value) => set((state) => {
                    const updatedItems = state.budgetItems.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    );
                    const summary = calcSummary(updatedItems, state.totalBudget);

                    return {
                        budgetItems: updatedItems,
                        ...summary,
                    };
                }),

                initBudgetItems: () => set(state => {
                    const { totalBudget, budgetItems } = state;
                    const updated = budgetItems.map((item) => ({
                        ...item,
                        targetAmount: Math.round(totalBudget * (item.categoryRatio / 100)) * 10000,
                    }));
                    const summary = calcSummary(updated, totalBudget);

                    return { budgetItems: updated, ...summary };
                }),

                updateBudgetRatios: (newRatios) => set(state => {
                    const { totalBudget, budgetItems } = state;

                    const updatedItem = budgetItems.map(item => {
                        const newRatio = newRatios[item.category] ?? item.categoryRatio;
                        const newTargetAmount = Math.round(totalBudget * (newRatio / 100)) * 10000;

                        return {
                            ...item,
                            categoryRatio: newRatio,
                            targetAmount: newTargetAmount,
                        }
                    });
                    const summary = calcSummary(updatedItem, totalBudget);

                    return { budgetItems: updatedItem, ...summary };
                }),

                calculateBudgetSummary: () => {
                    const { budgetItems, totalBudget } = get();
                    return calcSummary(budgetItems, totalBudget);
                }
            }
        },
        {
            name: "doori-storage",
        }
    )
)