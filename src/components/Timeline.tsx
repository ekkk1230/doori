'use client';

import { useDooriStore } from "@/store/useDooriStore";
import { calculateWeddingPeriod, parseDDay } from "@/utils/date";
import { useEffect, useState } from "react"
import { Gem } from "lucide-react";
import Loading from "@/app/Loading";

export default function Timeline() {
    const { weddingDate, getPastTasks, getUpcomingTasks, checkList, toggleChecklist } = useDooriStore();
    // console.log(items.length)

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <Loading />;

    const { diffDays, dDayText, periodMonths } = calculateWeddingPeriod(weddingDate);
    const currentDDay = parseDDay(dDayText);

    // 지난 일정, 남은 일정
    const pastTasks = getPastTasks(currentDDay);
    const upcomingTasks = getUpcomingTasks(currentDDay);
    // console.log('weddingDate', weddingDate)
    // console.log(diffDays, dDayText, periodMonths)

    const completedCount = upcomingTasks.filter(item => item.completed).length;
    const progressPercent = upcomingTasks.length > 0 ? Math.round((completedCount / upcomingTasks.length) * 100) : 0;

    // console.log(pastTasks, upcomingTasks)

    return (
        <>
            <div className="mt-[1rem] gless-card p-[2.4rem_2rem]">
                <p className="text-[1.2rem]">현재 진행률</p>
                <div className="flex items-center">
                    {/* 💡 계산된 진행률 연동 */}
                    <span className="font-bold text-[3rem]">{progressPercent}</span>
                    <sub className="text-[1.8rem] ml-[.4rem] text-[#b6a17a]">%</sub>
                </div>
                <div className="w-full bg-gray-200/80 rounded-full h-2.5 my-3 overflow-hidden">
                    <div 
                        className="bg-[#b6a17a] h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <ul className="flex">
                    <li>{completedCount}/{upcomingTasks.length} 완료</li>
                    <li>{periodMonths}개월 코스</li>
                </ul>
                <div><Gem/> {periodMonths}개월 플랜이므로 {pastTasks.length}개 항목이 자동 생략 되었어요.</div>
                <div className="total-tip">텍스트ㅡㅡ트ㅡ트트ㅡㅡ트ㅡ</div>
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
                                    {item.aiTip && <p>{item.aiTip}</p>}
                                    {item.shortPlanNote && <p>{item.shortPlanNote}</p>}
                                </div>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
