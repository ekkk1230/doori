'use client';

import { useDooriStore } from "@/store/useDooriStore";
import { calculateWeddingPeriod, parseDDay } from "@/utils/date";
import { useEffect, useState } from "react";
import { Gem, Sparkles, RefreshCw, Check } from "lucide-react";
import Loading from "@/app/Loading";

export default function Timeline() {
    const {
        weddingDate, totalBudget, checkList,
        getPastTasks, getUpcomingTasks, toggleChecklist, calculateBudgetSummary 
    } = useDooriStore();

    const [isMounted, setIsMounted] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<string>("");
    const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // console.log(totalBudget)

    const calcBudget = calculateBudgetSummary();
    const totalSpent = calcBudget.totalSpent;

    const { diffDays, dDayText, periodMonths } = calculateWeddingPeriod(weddingDate);
    const currentDDay = parseDDay(dDayText);

    // 지난 일정, 남은 일정
    const pastTasks = getPastTasks(currentDDay);
    const upcomingTasks = getUpcomingTasks(currentDDay);

    const completedCount = upcomingTasks.filter(item => item.completed).length;
    const progressPercent = upcomingTasks.length > 0 ? Math.round((completedCount / upcomingTasks.length) * 100) : 0;

    // AI 피드백 호출 함수
    const fetchAiFeedback = async () => {
        setIsLoadingAi(true);
        try {
            const numericTotalBudget = Number(totalBudget) || 0;
            
            const completedTaskTitles = upcomingTasks
                .filter(item => item.completed)
                .map(item => item.title);

            const uncompletedTaskTitles = upcomingTasks
                .filter(item => !item.completed)
                .map(item => `${item.title}${item.isEssential ? " (필수)" : ""}`)
                .slice(0, 5);

            const res = await fetch("/api/ai-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    periodMonths,
                    totalBudget: numericTotalBudget,
                    usedBudgetInManwon: totalSpent,
                    progressPercent,
                    completedTaskTitles,
                    uncompletedTaskTitles,
                }),
            });

            const data = await res.json();
            if (data.feedback) {
                setAiFeedback(data.feedback);
            }
        } catch (error) {
            console.error("AI 피드백 요청 실패:", error);
        } finally {
            setIsLoadingAi(false);
        }
    };

    // 마운트 후 최초 1회 피드백 불러오기
    useEffect(() => {
        if (isMounted && upcomingTasks.length > 0) {
            fetchAiFeedback();
        }
    }, [isMounted]);

    if (!isMounted) return <Loading />;

    return (
        <>
            <div className="my-[1rem_2rem] gless-card p-[2.4rem_2rem]">
                <p className="text-[1.2rem] flex items-center gap-[.4rem]"><Gem className="w-[1.2rem] h-[1.2rem]" /> 현재 진행률</p>
                <div className="flex items-center tit">
                    <span className="font-bold text-[3rem]">{progressPercent}</span>
                    <sub className="text-[1.8rem] ml-[.4rem] text-[#b6a17a]">%</sub>
                </div>
                <div className="w-full bg-gray-200/80 rounded-full h-[1.4rem] my-3 overflow-hidden">
                    <div 
                        className="gradient-card h-full rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <ul className="flex">
                    <li className="text-[1.2rem] flex items-center text-[#777]">{completedCount}/{upcomingTasks.length} 완료</li>
                    <li className="text-[1.2rem] flex items-center text-[#777] before:content-['·'] before:mx-[.4rem]">{periodMonths}개월 코스</li>
                    <li className="text-[1.2rem] flex items-center text-[#777] before:content-['·'] before:mx-[.4rem]">{periodMonths}개월 플랜이므로 {pastTasks.length}개 항목이 자동 생략 되었어요.</li>
                </ul>
                
                {/* Total Tip (AI 피드백) */}
                <div className="total-tip mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <div className="flex items-center justify-between font-bold mb-[1rem] text-amber-800">
                        <div className="flex items-center gap-[.6rem] text-[1.4rem]">
                            <Sparkles className="w-4 h-4" />
                            <span>DOORI AI 맞춤 피드백</span>
                        </div>
                        <button 
                            onClick={fetchAiFeedback} 
                            disabled={isLoadingAi}
                            className="text-[1.4rem] text-amber-700 flex items-center gap-1 hover:underline disabled:opacity-50"
                        >
                            <RefreshCw className={`w-[1.2rem] h-[1.2rem] ${isLoadingAi ? "animate-spin" : ""}`} />
                            새로고침
                        </button>
                    </div>
                    {isLoadingAi ? (
                        <p className="text-gray-400 text-[1.6rem] animate-pulse">DOORI AI가 준비 상황을 분석 중이에요...</p>
                    ) : (
                        <p className="text-[1.6rem] text-amber-950 leading-relaxed break-keep">
                            {aiFeedback || "일정을 분석 중입니다..."}
                        </p>
                    )}
                </div>
            </div>

            <p className="tit text-main text-[2.4rem] mb-[.2rem]">D-DAY 타임라인</p>
            <p className="text-[1.2rem] text-[#555] mb-[2rem]">예정 날짜 기준 월별 체크리스트</p>

            <ul className="space-y-[1rem]">
                {upcomingTasks.map(item => {
                    return (
                        <li key={item.id} className="border-solid border-[.1rem] border-[#efefef] p-[1rem_1.6rem] rounded-[.8rem]">
                            <label className="flex gap-[1rem]">
                                <input 
                                    type="checkbox" name="planCompleted" 
                                    checked={item.completed} 
                                    className="hidden peer"
                                    onChange={() => toggleChecklist(item.id)} 
                                />

                                <div className="custom-ck relative top-[.3rem] flex items-center justify-center bg-gray-200 peer-checked:bg-rose-200 peer-checked:border-rose-200">
                                    { item.completed && <Check className="w-[1rem] h-[1rem] text-white font-bold" /> }
                                </div>

                                <div className="w-full">
                                    <div className="flex items-center text-[1.8rem] gap-[1rem] mb-[1rem]">
                                        <span className="tit text-rose-800 font-bold">{item.dDay12m}</span>
                                        <p className="tit">{item.title}</p>
                                        <ul className="flex text-[1rem] gap-[.4rem]">
                                            <li className="p-[.4rem_.8rem] font-semibold rounded-[80rem] text-green-900 bg-green-100 text-[#555]">{item.category}</li>
                                            <li className="p-[.4rem_.8rem] font-semibold rounded-[80rem] text-red-900 bg-red-100 text-[#555]">{item.isEssential && "필수"}</li>
                                        </ul>
                                    </div>
                                    <p className="text-[#555] text-[1.4rem] leading-relaxed font-semibold">{item.description}</p>
                                    
                                    {item.plannerTip && <div className="p-[1rem_1.6rem] text-[1.2rem] my-[1rem] w-full rounded-[.8rem] bg-rose-50 text-rose-900">💡 {item.plannerTip}</div>}
                                    
                                    {item.shortPlanNote && periodMonths <= 6 && (
                                        <div className="p-[1rem_1.6rem] text-[1.2rem] my-[1rem] w-full rounded-[.8rem] bg-blue-50 text-blue-900">⚡ 단기 플랜 Tip: {item.shortPlanNote}</div>
                                    )}
                                </div>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}