'use client';

import React, { ReactNode, useState } from "react";
import {
    Banknote, CalendarDays, Check, ChevronRight, MapPin, Sparkles, Users, Wand2,
} from "lucide-react";
import { UserInput } from "@/types/doori";
import { calculateWeddingPeriod } from "@/utils/date";

interface OnboardingProps {
    onComplete?: () => void;
}

const periodOptions: { month: string; desc: string, value: string }[] = [
    { month: "12개월", desc: "여유 있는 정석 코스", value: "12" },
    { month: "8개월", desc: "가장 인기 있는 일정", value: "8" },
    { month: "6개월", desc: "빠르지만 체계적인 준비", value: "6" },
    { month: "4개월", desc: "초스피드 준비", value: "4" },
    { month: "3개월", desc: "최소 기간 다이어트", value: "3"},
    { month: "직접 입력", desc: "", value: "0" },
];

const GUEST_COUNT_OPTIONS = [
    { label: "150명", value: 150 },
    { label: "200명", value: 200 },
    { label: "250명", value: 250 },
    { label: "300명+", value: 300 },
];

const BUDGET_TIER_OPTIONS: { value: UserInput["budgetTier"]; icon: typeof Banknote }[] = [
    { value: "가성비", icon: Banknote },
    { value: "표준", icon: Sparkles },
    { value: "초호화", icon: Wand2 },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [weddingDate, setWeddingDate] = useState("");
    const [budgetInManwon, setBudgetInManwon] = useState("");
    const [location, setLocation] = useState("");
    const [budgetTier, setBudgetTier] = useState<UserInput["budgetTier"]>("표준");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [period, setPeriod] = useState<string | null>(null);
    const [inputPeriod, setInputPeriod] = useState<boolean>(false);
    const [guestCount, setGuestCount] = useState<number | null>(null);

    const handlePeriodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedValue = e.currentTarget.value;
        setPeriod(selectedValue);

        if (selectedValue === "0") {
            setInputPeriod(true);
            setWeddingDate("");
        } else {
            setInputPeriod(false);

            const monthsToAdd = Number(selectedValue);
            const targetDate = new Date();

            targetDate.setMonth(targetDate.getMonth() + monthsToAdd);

            const formattedDate = targetDate.toISOString().split("T")[0];
            setWeddingDate(formattedDate);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center bg-rose-50 px-6 py-12">
            <div className="mx-auto w-full rounded-[1.5rem] border border-white/60 bg-white/80 p-8 shadow-card backdrop-blur-xl">
                <h1 className="tit text-[2.4rem] tracking-[-.04rem] font-bold text-gray-800">
                    두 분의 웨딩,<br />
                    <span className="text-rose-400">AI가 설계해 드릴게요.</span>
                </h1>
                <p className="mt-[.8rem] text-[1.5rem] font-semibold text-gray-500">
                    기본 정보를 입력하면 AI가 맞춤 플랜을 만들어드려요.
                </p>

                <div className="mt-[3rem] flex flex-col gap-[2rem]">
                    <div>
                        <label className="flex items-center gap-[.6rem] text-[1.5rem] font-semibold text-gray-700">
                            <CalendarDays className="h-[1.8rem] w-[1.8rem] text-rose-400" />
                            준비 기간 (예식 예정 날짜)
                        </label>
                        <div className="grid grid-cols-3 mt-[1rem] gap-[1rem]">
                            {periodOptions.map((item, idx) => {
                                const isActive = item.value === period;

                                return (
                                    <button 
                                        className={`period-btn border-[.1rem] w-full border-solid p-[1.2rem_1rem] rounded-[.8rem] ${
                                            isActive
                                                ? `border-rose-500 text-rose-600 font-bold`
                                                : `border-gray-200 bg-white text-gray-700`
                                        }`}
                                        key={idx}
                                        value={item.value}
                                        type="button"
                                        onClick={handlePeriodClick}
                                    >
                                        <p className={`tit text-[1.4rem] text-center`}>{item.month}</p>
                                        <div className="text-gray-500 font-semibold text-[1.2rem] mt-[.2rem]">{item.desc !== "" && item.desc}</div>
                                    </button>
                                )
                            })}
                        </div>

                        {inputPeriod && 
                            <input
                                type="date"
                                value={weddingDate}
                                onChange={(e) => setWeddingDate(e.target.value)}
                                className="mt-[.8rem] w-full rounded-[1rem] border border-gray-200 px-[1.4rem] py-[1.2rem] text-[1.6rem] text-gray-800 outline-none focus:border-rose-300"
                            />
                        }

                        {weddingDate && (
                            <p className="mt-[.8rem] text-[1.3rem] font-medium text-rose-500">
                                예상 예식일: {weddingDate}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-[.6rem] text-[1.5rem] font-semibold text-gray-700">
                            <Banknote className="h-[1.8rem] w-[1.8rem] text-rose-400" />
                            예식 예정 금액 (만원)
                        </label>
                        <input
                            type="number"
                            min={0}
                            step={100}
                            placeholder="예: 3500"
                            value={budgetInManwon}
                            onChange={(e) => setBudgetInManwon(e.target.value)}
                            className="mt-[.8rem] w-full rounded-[1rem] border border-gray-200 px-[1.4rem] py-[1.2rem] text-[1.6rem] text-gray-800 outline-none focus:border-rose-300"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-[.6rem] text-[1.5rem] font-semibold text-gray-700">
                            <MapPin className="h-[1.8rem] w-[1.8rem] text-rose-400" />
                            예식 예정 장소
                        </label>
                        <input
                            type="text"
                            placeholder="예: 서울 강남구"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-[.8rem] w-full rounded-[1rem] border border-gray-200 px-[1.4rem] py-[1.2rem] text-[1.6rem] text-gray-800 outline-none focus:border-rose-300"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-[.6rem] text-[1.5rem] font-semibold text-gray-700">
                            <Users className="h-[1.8rem] w-[1.8rem] text-rose-400" />
                            예상 보증인원
                        </label>
                        <div className="mt-[.8rem] grid grid-cols-4 gap-[.8rem]">
                            {GUEST_COUNT_OPTIONS.map(({ label, value }) => {
                                const isSelected = guestCount === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setGuestCount(value)}
                                        className={`rounded-[1rem] border px-[1rem] py-[1.2rem] text-[1.4rem] font-medium transition-colors ${
                                            isSelected
                                                ? "border-rose-400 bg-rose-50 text-rose-500"
                                                : "border-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <span className="text-[1.5rem] font-semibold text-gray-700">
                            희망 예산 등급
                        </span>
                        <div className="mt-[.8rem] grid grid-cols-3 gap-[.8rem]">
                            {BUDGET_TIER_OPTIONS.map(({ value, icon: Icon }) => {
                                const isSelected = budgetTier === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setBudgetTier(value)}
                                        className={`flex flex-col items-center gap-[.4rem] rounded-[1rem] border px-[1rem] py-[1.2rem] text-[1.4rem] font-medium transition-colors ${
                                            isSelected
                                                ? "border-rose-400 bg-rose-50 text-rose-500"
                                                : "border-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {isSelected ? (
                                            <Check className="h-[1.6rem] w-[1.6rem]" />
                                        ) : (
                                            <Icon className="h-[1.6rem] w-[1.6rem]" />
                                        )}
                                        {value}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-[1.4rem] font-medium text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="button"
                        className="mt-[1rem] flex items-center justify-center gap-[.6rem] rounded-[1rem] bg-rose-400 px-[1.6rem] py-[1.4rem] text-[1.6rem] font-bold text-white transition-colors hover:bg-rose-500"
                    >
                        AI 웨딩 플랜 시작하기
                        <ChevronRight className="h-[1.8rem] w-[1.8rem]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
