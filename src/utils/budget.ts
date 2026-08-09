import { MOCK_BUDGET_SUMMARY } from "@/constants/mockData";
import { BUDGET_TIER_GUIDES } from "@/data/budgetTierGuide";
import { Budget } from "@/types/doori";

export const generateBudgetItems = (totalBudget: number, budgetTier: Budget.UserInput["budgetTier"]): Budget.Item[] => {
    return MOCK_BUDGET_SUMMARY.map(item => {
        const guide = BUDGET_TIER_GUIDES[item.category][budgetTier];
        const ratio = guide.recommendedRatio;
        const caclulatedTarget = Math.round(totalBudget * (ratio / 100));
        
        return {
            ...item,
            categoryRatio: ratio,
            standardRangeText: guide.standardRangeText,
            targetAmount: caclulatedTarget,
            actualAmount: 0, 
        };
    });
}