'use client';

import { useDooriStore } from "@/store/useDooriStore";
import { calculateWeddingPeriod, parseDDay } from "@/utils/date";
import { useEffect, useState } from "react";
import { Gem, Sparkles, RefreshCw } from "lucide-react";
import Loading from "@/app/Loading";

export default function Timeline() {
    const { weddingDate, totalBudget, getPastTasks, getUpcomingTasks, checkList, toggleChecklist } = useDooriStore();

    const [isMounted, setIsMounted] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<string>("");
    const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    console.log(totalBudget)

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
                    usedBudgetInManwon: 0, // 사용된 예산 변수가 있다면 지정
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
            <div className="mt-[1rem] gless-card p-[2.4rem_2rem] mx-[2rem]">
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
                    <div className="flex items-center justify-between font-bold mb-1 text-amber-800">
                        <div className="flex items-center gap-[.6rem] text-[1.4rem]">
                            <Sparkles className="w-4 h-4" />
                            <span>DOORI AI 맞춤 피드백</span>
                        </div>
                        <button 
                            onClick={fetchAiFeedback} 
                            disabled={isLoadingAi}
                            className="text-xs text-amber-700 flex items-center gap-1 hover:underline disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3 h-3 ${isLoadingAi ? "animate-spin" : ""}`} />
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

            <p className="tit text-main text-[2rem]">D-DAY 타임라인</p>

            <ul>
                {upcomingTasks.map(item => {
                    return (
                        <li key={item.id}>
                            <label>
                                <input 
                                    type="checkbox" name="planCompleted" 
                                    checked={item.completed} 
                                    onChange={() => toggleChecklist(item.id)} 
                                />

                                <div>
                                    <div className="flex">
                                        <span>{item.dDay12m}</span>
                                        <p>{item.title}</p>
                                        <ul className="flex">
                                            <li>{item.category}</li>
                                            <li>{item.isEssential && "필수"}</li>
                                        </ul>
                                    </div>
                                    <p>{item.description}</p>
                                    
                                    {item.plannerTip && <p>💡 {item.plannerTip}</p>}
                                    
                                    {item.shortPlanNote && periodMonths <= 6 && (
                                        <p>⚡ 단기 플랜 Tip: {item.shortPlanNote}</p>
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