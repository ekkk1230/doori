"use client";

import { useDooriStore } from "@/store/useDooriStore";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function BudgetInputForm() {
    const { totalBudget, budgetItems, updateBudgetItem } = useDooriStore();

    const totalSpent = budgetItems.reduce((acc, item) => {
        return acc + (item.actualAmount || 0);
    }, 0);

    const diffBudget = totalBudget - totalSpent;

    // console.log(totalSpent)

    return (
        <div className="container">
            <div className="relative gless-card">
                <p>총예산 대비 지출 현황</p>
                <div className="tit text-[1.8rem] text-[#777]">
                    <span className="text-[3rem] text-[#000]">0만 원</span> / {totalBudget}만 원
                </div>
                <div className="absolute right-[2rem] top-[2rem]">
                    <div><TrendingUp />{ diffBudget }</div>
                </div>
            </div>
        </div>
    )
}
