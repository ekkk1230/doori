"use client";

import { BUDGET_TIER_GUIDES } from "@/data/budgetTierGuide";
import { useForm } from "@/hook/useForm";
import { useDooriStore } from "@/store/useDooriStore";
import { Budget } from "@/types/doori";
import { TrendingUp, TrendingDown, Pencil } from "lucide-react";
import { useEffect } from "react";


const BudgetItemCard = (
    { item, budgetTier, onUpdate }: 
    { 
        item: Budget.Item; 
        budgetTier: Budget.UserInput['budgetTier']; 
        onUpdate: (id: string, field: "targetAmount" | "actualAmount", value: number | null) => void;
    }) => {
        const curTierGuide = BUDGET_TIER_GUIDES[item.category as keyof typeof BUDGET_TIER_GUIDES]?.[budgetTier];
        // console.log(curTierGuide)

        const { form, handleChange } = useForm({
            actualAmount: item.actualAmount ?? ""
        });

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            actualAmount: item.actualAmount ?? ""
        }))
    }, [item.actualAmount, setForm])

    const handleSave = () => {
        const val = form.actualAmount;
        const num = Number(val);

        if (val === "" || isNaN(num)) {
            onUpdate(item.id, "actualAmount", null);
        } else {
            onUpdate(item.id, "actualAmount", num);
        }
    };

    console.log(item)

    return (
        <div key={item.id} className="gless-card">
            <div className="guide-info-wrap flex justify-between">
                <div className="tit-info-wrap">
                    <div className="tit-area flex items-center mb-[.8rem]">
                        <p className="tit text-[1.8rem]">{item.category}</p>
                        <div className="ml-[1rem] p-[.4rem_1rem] rounded-[80rem] bg-[#efefef]">{curTierGuide.recommendedRatio}%</div>
                    </div>
                    <div className="flex text-[1.2rem] text-[#555]">
                        <p>{budgetTier}</p>
                        <div className="flex before:content-['·'] before:mx-[.4rem]">{curTierGuide.standardRangeText}</div>
                        <div className="flex before:content-['·'] before:mx-[.4rem]">{curTierGuide.tierGuideText}</div>
                    </div>
                </div>
                <div className="target-amount-wrap">
                    <p className="text-[1.2rem] text-[#555] text-right">목표 예산</p>
                    <p className="tit text-[1.8rem]">{item.targetAmount}만 원</p>
                </div>
            </div>
            <div className="bg-[#f7f7f7] items-center gap-[1rem] mt-[1rem] rounded-[1.2rem] p-[1rem_1.4rem] text-[1.2rem] color-[#555] flex">
                <p className="whitespace-nowrap">실제 계약 금액</p>
                <input 
                    type="text" 
                    className="w-full p-[.8rem_1rem] rounded-[.8rem]" 
                    placeholder="미입력" 
                    name="actualAmount"
                    value={form.actualAmount}
                    onChange={handleChange}
                />
                <button 
                    onClick={handleSave}
                    className="cursor-pointer whitespace-nowrap p-[.8rem_1rem] rounded-[.8rem] flex gap-[.4rem] bg-white border-[.1rem] border-solid border-[#eee] items-center">
                        <Pencil className="w-[1rem] h-[1rem]" />입력
                </button>
            </div>
        </div>
    )
}

export default function BudgetInputForm() {
    const { 
        totalBudget, budgetItems, budgetTier, 
        updateBudgetItem
    } = useDooriStore();

    const totalSpent = budgetItems.reduce((acc, item) => {
        return acc + (item.actualAmount || 0);
    }, 0) / 10000;

    console.log(totalSpent)
    
    const diffBudget = totalBudget - totalSpent;

    const progressPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    // console.log(progressPercent)

    // console.log(budgetTier)
    // console.log(BUDGET_TIER_GUIDES);

    return (
        <div className="container">
            <div className="relative gless-card">
                <p className="text-[1.2rem] mb-[.8rem] font-semibold text-[#555]">총예산 대비 지출 현황</p>
                <div className="tit text-[1.8rem] text-[#777]">
                    <span className="text-[3rem] text-[#000]">{totalSpent}만 원</span> / {totalBudget}만 원
                </div>
                <div className="absolute flex gap-[.4rem] right-[2rem] top-[2rem]">
                    <TrendingUp className="w-[1.4rem] h-[1.4rem]" /> { diffBudget }
                </div>
                <div className="mt-[1rem]">
                    <div className="flex justify-between">
                        <span className="text-[1.4rem] font-semibold text-[#555]">지출 진행률</span>
                        <span className="text-[1.4rem] font-semibold text-[#555]">{progressPercent}%</span>
                    </div>
                    <div className="w-fullrelative bg-gray-200/80 rounded-full h-[1.4rem] my-3">
                        <div 
                            className="gradient-card h-full rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className="my-[4rem_2rem]">
                    <p className="tit text-[2rem] my-[2rem_.2rem]">항목별 예산 배분</p>
                    <p className="text-[1.2rem] text-[#555]">총예산 {totalBudget}만 원 • {budgetTier} 라인 기준</p>
                </div>


                <div className="space-y-[2rem]">
                    {budgetItems.map(item  => {
                        return (
                            <BudgetItemCard key={item.id} item={item} budgetTier={budgetTier} onUpdate={updateBudgetItem} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

