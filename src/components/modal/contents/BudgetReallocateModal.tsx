"use client";

import { BUDGET_TIER_GUIDES, BUDGET_TIER_OPTIONS } from "@/data/budgetTier";
import ModalButtons from "../ModalButtons";
import { Sliders, AlertCircle, CheckCircle2, RotateCcw, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { useDooriStore } from "@/store/useDooriStore";
import { useForm } from "@/hook/useForm";
import { Budget } from "@/types/doori";

// 1. 순수 티어 가이드 비율 가져오는 함수
const getTierGuideRatios = (tier: Budget.UserInput["budgetTier"]) => {
    return Object.entries(BUDGET_TIER_GUIDES).reduce((acc, [category, tiers]) => {
        const curTier = tiers[tier as keyof typeof tiers];
        acc[category] = curTier?.recommendedRatio ?? 0;
        return acc;
    }, {} as Record<string, number>);
};

// 2. 모달 첫 진입 시 스토어 값을 우선 불러오는 함수
const getInitialRatios = (items: Budget.Item[], tier: Budget.UserInput["budgetTier"]) => {
    if (items && items.length > 0) {
        return items.reduce((acc, cur) => {
            acc[cur.category] = cur.categoryRatio ?? 0;
            return acc;
        }, {} as Record<string, number>);
    }
    return getTierGuideRatios(tier);
};

export default function BudgetReallocateModal() {
    const { 
        budgetTier, totalBudget, budgetItems,
        setBudgetTier, updateBudgetRatios 
    } = useDooriStore();

    // 초기 상태: 스토어에 저장된 budgetItems 비율 사용
    const { form, setForm, handleChange } = useForm(getInitialRatios(budgetItems, budgetTier));
    const [selectButton, setSelectButton] = useState<Budget.UserInput["budgetTier"]>(budgetTier);
    const [userTier, setUserTier] = useState<Budget.UserInput["budgetTier"]>(budgetTier);

    const totalRatio = Object.values(form).reduce((acc, cur) => acc + Number(cur || 0), 0);
    const isTotal100 = totalRatio === 100;

    // 티어 카드 클릭 시: 해당 티어의 추천 비율로 form 갱신
    const handleTierSelect = (tier: Budget.UserInput["budgetTier"]) => {
        setSelectButton(tier);
        setUserTier(tier);
        setForm(getTierGuideRatios(tier)); 
    };

    // 초기화 클릭 시: 선택된 티어의 기본 추천 비율로 리셋
    const handleReset = () => {
        setForm(getTierGuideRatios(selectButton));
    };

    const handleSave = () => { 
        if (!isTotal100) {
            alert("비율 합계가 100%가 되어야 적용할 수 있습니다.");
            return;
        }
        setBudgetTier(userTier);
        updateBudgetRatios(form);
    };

    return (
        <div className="w-full text-[#333]">
            {/* 1. 모달 헤더 */}
            <div className="flex items-center justify-between mb-[1.6rem]">
                <div className="flex items-center gap-[1rem]">
                    <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-[1.2rem] bg-black/5 text-black">
                        <Sliders className="w-[2rem] h-[2rem]" />
                    </div>
                    <div>
                        <h3 className="tit text-[2rem] font-bold tracking-tight">
                            항목별 예산 재분배
                        </h3>
                        <p className="text-[1.3rem] text-[#777] mt-[.2rem]">
                            추천 라인으로 자동 배분하거나 직접 비율을 조절할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-y-auto">
                {/* 2. 자동 / 직접 분배 탭 전환 버튼 */}
                <div className="flex p-[.4rem] bg-[#f2f2f2] rounded-[1.2rem] mb-[2rem]">
                    <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-[.6rem] py-[1rem] rounded-[.8rem] text-[1.4rem] font-medium transition-all cursor-pointer bg-white text-black shadow-sm"
                    >
                        <Sparkles className="w-[1.6rem] h-[1.6rem]" />
                        자동 배분 (추천 라인)
                    </button>

                    <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-[.6rem] py-[1rem] rounded-[.8rem] text-[1.4rem] font-medium transition-all cursor-pointer text-[#777] hover:text-black"
                    >
                        <UserCheck className="w-[1.6rem] h-[1.6rem]" />
                        직접 분배
                    </button>
                </div>

                {/* 3-A. [자동 배분 UI 영역] */}
                <div className="space-y-[1.6rem] mb-[2.4rem]">
                    <div className="grid grid-cols-3 gap-[1rem]">
                        {BUDGET_TIER_OPTIONS.map(item => {
                            const isSelected = selectButton === item.value;
                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    className={`relative flex flex-col items-center justify-center p-[1.8rem_1.2rem] rounded-[1.4rem] border transition-all cursor-pointer ${
                                        isSelected ? 'border-black bg-black text-white shadow-md font-semibold' : 'border-[#eee] bg-white text-[#666] hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                                    onClick={() => handleTierSelect(item.value)}
                                >
                                    {isSelected && (
                                        <CheckCircle2 className="absolute top-[.8rem] right-[.8rem] w-[1.4rem] h-[1.4rem] text-white" />
                                    )}

                                    <span className="text-[1.6rem] mb-[.4rem]">{item.value}</span>
                                    <span className="text-[1.2rem] text-[#888]">{item.sub}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-[1.6rem] rounded-[1.2rem] bg-[#f9f9f9] border border-[#eee] text-[1.3rem]">
                        <p className="font-semibold mb-[.8rem] text-[#333]">
                            {userTier} 예상 항목 비율
                        </p>
                        <div className="grid grid-cols-2 gap-[.6rem_2rem] text-[#666]">
                            {Object.entries(BUDGET_TIER_GUIDES).map(([category, tierInfo], idx) => {
                                const cureTier = tierInfo[userTier as keyof typeof tierInfo];
                                return (
                                    <div key={idx} className="flex justify-between">
                                        <div>{category}</div>
                                        <div className="font-medium text-black">{cureTier?.recommendedRatio ?? 0}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mb-[2.4rem]">
                    <div className="flex items-center justify-between mb-[1.2rem]">
                        {isTotal100 ? (
                            <div className="flex items-center gap-[.6rem] px-[1.2rem] py-[.6rem] rounded-[.8rem] text-[1.3rem] font-medium border bg-green-50 border-green-200 text-green-800 transition-colors">
                                <CheckCircle2 className="w-[1.6rem] h-[1.6rem] text-green-600" />
                                <span>비율 합계: 100 / 100% (완료)</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-[.6rem] px-[1.2rem] py-[.6rem] rounded-[.8rem] text-[1.3rem] font-medium border bg-red-50 border-red-200 text-red-800 transition-colors">
                                <AlertCircle className="w-[1.6rem] h-[1.6rem] text-red-600" />
                                <span>
                                    비율 합계: {totalRatio} / 100%
                                    <span className="ml-[.4rem] font-normal text-[1.2rem]">
                                        ({100 - totalRatio > 0 ? `+${100 - totalRatio}% 필요` : `${100 - totalRatio}% 초과`})
                                    </span>
                                </span>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-[.4rem] text-[1.2rem] text-[#666] hover:text-black p-[.6rem_1rem] rounded-[.8rem] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-[1.2rem] h-[1.2rem]" />
                            초기화
                        </button>
                    </div>

                    {/* 직접 비율 조절 아이템 리스트 (budgetItems 사용) */}
                    <div className="space-y-[1.2rem] overflow-y-auto pr-[.6rem] p-[1.2rem_1.4rem] rounded-[1.2rem] bg-[#f9f9f9] border border-[#eee]">
                        {budgetItems.map((item, index) => {
                            const currentRatio = form[item.category] ?? 0;
                            const calculatedBudget = Math.round(totalBudget * (currentRatio / 100));

                            return (
                                <div 
                                    key={item.id} 
                                    className={`pb-[1.2rem] ${
                                        index !== budgetItems.length - 1 ? 'border-b border-[#e5e5e5]' : 'pb-0'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-[.8rem]">
                                        <span className="font-semibold text-[1.4rem]">{item.category}</span>
                                        <div className="flex items-center gap-[.8rem]">
                                            <span className="text-[1.2rem] text-[#666]">
                                                {calculatedBudget.toLocaleString()}만 원
                                            </span>

                                            <div className="flex items-center bg-white border border-[#ddd] rounded-[.6rem] px-[.6rem] py-[.2rem]">
                                                <input
                                                    type="number"
                                                    name={item.category}
                                                    value={currentRatio}
                                                    onChange={handleChange}
                                                    min="0"
                                                    max="100"
                                                    className="w-[3.2rem] text-right font-bold text-[1.3rem] outline-none"
                                                />
                                                <span className="text-[1.1rem] text-[#777] ml-[.2rem]">%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        step="5"
                                        max="100"
                                        name={item.category}
                                        value={currentRatio}
                                        onChange={handleChange}
                                        className="w-full h-[.6rem] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 4. 하단 버튼 */}
            <ModalButtons onConfirm={handleSave} />
        </div>
    );
}