import { useDooriStore } from "@/store/useDooriStore";
import { CalendarDays, MapPin, Wallet, Sparkles, ChevronRight, UserRound } from "lucide-react";
import { useRef } from "react";
import { calculateWeddingPeriod, parseDDay } from "@/utils/date";
import Link from "next/link";
import { MOCK_BUDGET_SUMMARY } from "@/constants/mockData"; 

export default function PlanTab() {
    const { 
        weddingDate, totalBudget, location, guestCount, budgetTier,
        getUpcomingTasks
    } = useDooriStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const dDay = calculateWeddingPeriod(weddingDate);
    
    const upcomingTasks = getUpcomingTasks(dDay.diffDays);

    // console.log(upcomingTasks)
    

    return (
        <>
            <div ref={containerRef} className="container">
                <div className="myPlanCard gradient-card rounded-[1.6rem] p-[2rem]">
                    <p className="text-white text-[1.6rem] flex items-center mb-[1rem] tit"><Sparkles className="mr-[.8rem] w-[2rem] h-[2rem]" />AI 맞춤 플랜</p>
                    <p className="tit text-[3rem] text-bold text-white">{location} &middot; {dDay.periodMonths}개월 웨딩 플랜</p>

                    <div className="flex items-center">
                        <ul className="flex gap-[1rem]">
                            <li className="flex items-center plan-util-item"><CalendarDays className="icon" />예정일 : {weddingDate}</li>
                            <li className="flex items-center plan-util-item"><MapPin className="icon" />장소 : {location}</li>
                            <li className="flex items-center plan-util-item"><Wallet className="icon" />예산 : {totalBudget}</li>
                            <li className="flex items-center plan-util-item"><UserRound className="icon" />보증인원 : {guestCount}</li>
                        </ul>
                        <span className="bg-white text-[#d38021] p-[.4rem_1.2rem] text-[1.4rem] font-semibold rounded-[8rem] block ml-[1rem]">{budgetTier}</span>
                    </div>

                    <div className="rounded-[1.6rem] text-white flex items-center gap-[.4rem] text-[1.4rem] bg-[rgba(255,255,255,.2)] p-[1.2rem] backdrop-blur-[1rem] mt-[1rem] inline-flex">
                        예식까지 <span className="text-white tit text-[2rem] font-bold">{dDay.dDayText}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 grid-cols-2 mt-[2rem] gap-[.8rem]">
                    <Link href="#" className="link-box bg1">
                        <span className="text-[3rem]">💰</span>
                        <div className="relative w-full">
                            <p className="sm-tit">예산 배분</p>
                            <p className="item-count tit">5항목</p>
                            <p className="sm-tit">총 {totalBudget}만원</p>
                            <ChevronRight className="absolute top-[50%] right-0 translate-y-[-50%]" />
                        </div>
                    </Link>
                    <Link href="#" className="link-box bg2">
                        <span className="text-[3rem]">🗓️</span>
                        <div className="relative w-full">
                            <p className="sm-tit">준비 타임라인</p>
                            <p className="item-count tit">18개 일정</p>
                            <p className="sm-tit">0개 완료</p>
                            <ChevronRight className="absolute top-[50%] right-0 translate-y-[-50%]" />
                        </div>
                    </Link>
                    <Link href="#" className="link-box bg3">
                        <span className="text-[3rem]">📸</span>
                        <div className="relative w-full">
                            <p className="sm-tit">스드메 비교</p>
                            <p className="item-count tit">추가금 분석</p>
                            <p className="sm-tit">숨은 비용 확인</p>
                            <ChevronRight className="absolute top-[50%] right-0 translate-y-[-50%]" />
                        </div>
                    </Link>
                    <Link href="#" className="link-box bg4">
                        <span className="text-[3rem]">📍</span>
                        <div className="relative w-full">
                            <p className="sm-tit">지역 업체</p>
                            <p className="item-count tit">{location}</p>
                            <p className="sm-tit">업체 둘러보기</p>
                            <ChevronRight className="absolute top-[50%] right-0 translate-y-[-50%]" />
                        </div>
                    </Link>
                </div>

                <div className="gless-card mt-[2rem]">
                    <p className="tit text-[1.8rem] mb-[1rem]">예산 배분 요약</p>
                    <ul className="space-y-[1.6rem]">
                        {MOCK_BUDGET_SUMMARY.map(item => {
                            const Icon = item.icon;
                            const itemBudgetPercent = Math.round((item.actualAmount / item.targetAmount) * 100);

                            return (
                                <li key={item.id} className="flex items-center text-[1.6rem] gap-[1rem]">
                                    <Icon className="h-[4rem] w-[4rem] text-rose-400" />
                                    <p className="min-w-[8rem] whitespace-nowrap">{item.category}</p>
                                    <div className="w-full bg-gray-200/80 rounded-full h-[1rem] my-3 overflow-hidden">
                                        <div 
                                            className="gradient-card h-full rounded-full transition-all duration-500 ease-out" 
                                            style={{ width: `${itemBudgetPercent}%` }}
                                        />
                                    </div>
                                    <p className="min-w-[8rem] text-right whitespace-nowrap">{item.targetAmount}만 원</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="gless-card mt-[2rem] relative">
                    <p className="tit text-[1.8rem] mb-[1rem]">다가오는 일정</p>
                    <ul className="space-y-[.8rem]">
                        {upcomingTasks.slice(0, 3).map(item => {
                            // console.log(item.dDay12m)
                            const currentDday = parseDDay(dDay.dDayText);
                            // console.log(currentDday)
                            const itemDday = parseDDay(item.dDay12m);
                            // console.log(itemDday)
                            const remainingDate = currentDday - itemDday;

                            return (
                                <li key={item.id} className="flex text-[1.6rem] p-[1rem_1.2rem] rounded-[1.2rem] bg-gray-200/20">
                                    <p className="tit mr-[1rem] text-rose-700">D-{remainingDate}</p>
                                    <p className="font-bold">{item.title}</p>
                                    <p className="ml-auto text-[1.2rem] text-rose-950 font-semibold p-[.6rem_1.8rem] rounded-[80rem] bg-amber-200/50">{item.isEssential && "필수"}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <Link href="/timeline" className="flex items-center text-[1.4rem] text-rose-800 absolute right-[2rem] top-[2rem]">전체 보기 <ChevronRight className="w-[1.4rem] h-[1.4rem]" /></Link>
                </div>
            </div>
            
        </>
    );
}
