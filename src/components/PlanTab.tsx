import { useDooriStore } from "@/store/useDooriStore";
import { CalendarDays, MapPin, Wallet, Sparkles, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Header from "./Header";
import { calculateWeddingPeriod } from "@/utils/date";
import Link from "next/link";

export default function PlanTab() {
    const { 
        weddingDate, budgetInManwon, location, guestCount, budgetTier 
    } = useDooriStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const dDay = calculateWeddingPeriod(weddingDate);

    return (
        <>
            <Header />

            <div ref={containerRef} className="p-[2rem_2.4rem]">
                <div className="myPlanCard gradient-card rounded-[1.6rem] p-[2rem]">
                    <p className="text-white text-[1.6rem] flex items-center mb-[1rem]"><Sparkles className="mr-[.8rem] w-[2rem] h-[2rem]" />AI 맞춤 플랜</p>
                    <p className="tit text-[3rem] text-bold text-white">{location} &middot; {dDay.periodMonths}개월 웨딩 플랜</p>

                    <div className="flex items-center">
                        <ul className="flex gap-[1rem]">
                            <li className="flex items-center plan-util-item"><CalendarDays className="icon" />예정일 : {weddingDate}</li>
                            <li className="flex items-center plan-util-item"><MapPin className="icon" />장소 : {location}</li>
                            <li className="flex items-center plan-util-item"><Wallet className="icon" />예산 : {budgetInManwon}</li>
                        </ul>
                        <span className="bg-white text-[#d38021] p-[.4rem_1.2rem] text-[1.4rem] font-semibold rounded-[8rem] block ml-[1rem]">{budgetTier}</span>
                    </div>

                    <div className="rounded-[1.6rem] text-white flex items-center gap-[.4rem] text-[1.4rem] bg-[rgba(255,255,255,.2)] p-[1.2rem] backdrop-blur-[1rem] mt-[1rem] inline-flex">
                        예식까지 <span className="text-white tit text-[2rem] font-bold">{dDay.dDayText}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 grid-cols-2 mt-[2rem] gap-[.8rem]">
                    <Link href="#" className="link-box">
                        <span className="text-[3rem]">💰</span>
                        <div>
                            <p className="sm-tit">예산 배분</p>
                            <p className="item-count tit">5항목</p>
                            <p className="sm-tit">총 {budgetInManwon}만원</p>
                        </div>
                    </Link>
                    <Link href="#" className="link-box">
                        <span className="text-[3rem]">🗓️</span>
                        <div>
                            <p className="sm-tit">준비 타임라인</p>
                            <p className="item-count tit">18개 일정</p>
                            <p className="sm-tit">0개 완료</p>
                        </div>
                    </Link>
                    <Link href="#" className="link-box">
                        <span className="text-[3rem]">📸</span>
                        <div>
                            <p className="sm-tit">스드메 비교</p>
                            <p className="item-count tit">추가금 분석</p>
                            <p className="sm-tit">숨은 비용 확인</p>
                        </div>
                    </Link>
                    <Link href="#" className="link-box">
                        <span className="text-[3rem]">📍</span>
                        <div>
                            <p className="sm-tit">지역 업체</p>
                            <p className="item-count tit">서울 강남</p>
                            <p className="sm-tit">업체 둘러보기</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
