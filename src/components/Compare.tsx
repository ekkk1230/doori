"use client";

import { useDooriStore } from "@/store/useDooriStore";
import { useUiStore } from "@/store/useUiStore";
import { Budget } from "@/types/doori";
import { Camera, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

interface QuarterData {
    quarter: string;
    season: string;
    localHall: string;
    localSdm: string;
    localTotal: string;
    metroHall: string;
    metroSdm: string;
    metroTotal: string;
};

interface MarketTrendsResult {
    updatedAt: string;
    quarters: QuarterData[];
    isFallback: boolean;
}

export default function Compare() {
    const { location, budgetTier, weddingDate, guestCount, budgetItems } = useDooriStore();
    const { isLoading, setLoading } = useUiStore();
    const curYear = new Date().toISOString().split('T')[0].split('-')[0];

    const [trendsResult, setTrendsResult] = useState<MarketTrendsResult | null>(null);
    const [reportResult, setReportResult] = useState<Budget.ComparisonReport | null>(null);

    useEffect(() => {
        if (budgetItems && budgetItems.length > 0) {
            runAutoAnalysis();
        }
    }, [budgetItems]);

    const runAutoAnalysis = async () => {
        setLoading(true);
        try {
            const contractInputs = budgetItems
                .filter(item => item.actualAmount && item.actualAmount > 0)
                .map(item => ({
                    category: item.category,
                    contractAmount: Math.round((item.actualAmount || 0) / 10000),
                }))

            const trendsRes = await fetch("/api/market-trends");
            const trendsData: MarketTrendsResult = await trendsRes.json();

            setTrendsResult(trendsData);

            const reportRes = await fetch("/api/compare-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    location,
                    weddingDate,
                    guestCount,
                    contractInputs,
                    marketTrends: trendsData,
                }),
            });

            const reportData: Budget.ComparisonReport = await reportRes.json();
            setReportResult(reportData);
        } catch (err) {
            console.error(`${err}`);
        } finally {
            setLoading(false);
        }
    }

    // console.log(trendsresult)
    console.log(reportResult)

    return (
        <div className="container">
            <div className="gradient-card rounded-[1.6rem] p-[2rem] w-full">
                <p className="text-white text-[1.6rem] flex items-center mb-[1rem] tit"><Camera className="mr-[.8rem] w-[2rem] h-[2rem]" />견적 비교 및 분석</p>
                <p className="tit text-[3rem] text-bold text-white">{location}·{budgetTier} 라인 실제 계약 분석 </p>
            </div>

            <div className="my-[4rem]">
                <div className="flex items-end justify-between mb-[1.4rem] gap-[1rem]">
                    <p className="tit text-[2rem]">한눈에 보는 {curYear} 웨딩 시세표</p>
                    <p className="flex relative top-[-.5rem] items-center gap-[.4rem] before:content-['※'] text-rose-400 font-bold text-[1.2rem]">AI로 분석된 정보입니다. 실제 시세와 차이가 있을 수 있으니 참고용으로 활용하시기 바랍니다.</p>
                </div>

                {isLoading 
                    ? (
                        <div className="w-full h-48 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-slate-500 text-[1.4rem]">실시간 시세 데이터를 불러오는 중...</p>
                        </div>
                    ) 
                    : (
                        <div>
                            <div className="w-full overflow-x-auto rounded-[1.2rem] border border-slate-200 shadow-sm bg-white">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-slate-50 border-b text-center border-slate-200 text-[1.3rem] text-slate-600">
                                            <th className="p-4 font-semibold md:w-[15%] w-[20%]">분기</th>
                                            <th className="p-4 font-semibold md:w-[20%] w-[30%]">시즌 특징</th>
                                            <th className="p-4 font-semibold text-center bg-indigo-50/50 text-indigo-950" colSpan={2}>
                                                수도권 (서울/경기/인천)
                                            </th>
                                            <th className="p-4 font-semibold text-center bg-emerald-50/50 text-emerald-950" colSpan={2}>
                                                지방 거점 도시
                                            </th>
                                        </tr>
                                        <tr className="bg-slate-50/70 border-b border-slate-200 text-[1.2rem] text-slate-500">
                                            <th className="p-2 border-r border-slate-100"></th>
                                            <th className="p-2 border-r border-slate-100"></th>
                                            <th className="p-2 text-center border-r border-slate-100 bg-indigo-50/30">웨딩홀</th>
                                            <th className="p-2 text-center border-r border-slate-100 bg-indigo-50/30">스드메</th>
                                            <th className="p-2 text-center border-r border-slate-100 bg-emerald-50/30">웨딩홀</th>
                                            <th className="p-2 text-center bg-emerald-50/30">스드메</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-[1.3rem]">
                                        {trendsResult?.quarters?.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="p-4 font-bold text-slate-900 border-r border-slate-100">
                                                    {item.quarter}
                                                </td>
                                                <td className="p-4 text-slate-600 border-r border-slate-100 text-[1.2rem] leading-relaxed">
                                                    {item.season}
                                                </td>
                                                {/* 수도권 데이터 */}
                                                <td className="p-4 text-center font-medium text-slate-800 border-r border-slate-100 bg-indigo-50/10">
                                                    {item.metroHall}
                                                </td>
                                                <td className="p-4 text-center text-slate-700 border-r border-slate-100 bg-indigo-50/10">
                                                    {item.metroSdm}
                                                </td>
                                                {/* 지방 데이터 */}
                                                <td className="p-4 text-center font-medium text-slate-800 border-r border-slate-100 bg-emerald-50/10">
                                                    {item.localHall}
                                                </td>
                                                <td className="p-4 text-center text-slate-700 bg-emerald-50/10">
                                                    {item.localSdm}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>
            
            <div>
                <div className="flex items-end justify-between mb-[1.4rem] gap-[1rem]">
                    <p className="tit text-[2rem]">실제 견적 VS 지역 평균 견적 비교</p>
                    <p className="flex relative top-[-.5rem] items-center gap-[.4rem] before:content-['※'] text-rose-400 font-bold text-[1.2rem]">AI로 분석된 평균 견적 정보입니다. 실제 견적 금액과 차이가 있을 수 있으니 참고용으로 활용하시기 바랍니다.</p>
                </div>

                <div className="flex gap-[1rem]">
                    {reportResult?.packageComparison && (
                        Object.entries(reportResult?.packageComparison).map(([key, pkg]) => {
                            const userPkg = reportResult.packageComparison.userPackage;
                            const recommendPkg = reportResult.packageComparison.recommendedPackage;

                            const isUserCheaper = userPkg.totalSpent < recommendPkg.totalSpent;
                            const isRecommendCheaper = recommendPkg.totalSpent < userPkg.totalSpent;

                            const isWinner = 
                                (key === "userPackage" && isUserCheaper) || 
                                (key === "recommendedPackage" && isRecommendCheaper);

                            return (
                                <div className={`gless-card w-full relative ${isWinner && 'border-solid border-[.2rem] border-emerald-500 shadow-emerald-300'}`} key={key}>
                                    { isWinner && (
                                        <div className="text-center rounded-[50%] w-[4.8rem] h-[4.8rem] flex flex-col items-center justify-center border-solid border-emerald-500 border-[.1rem] text-emerald-500 font-semibold absolute top-[2rem] right-[2rem]">
                                            <ThumbsUp className="w-[1.6rem] h-[1.6rem] mx-auto mb-[.2rem]" />
                                            <span className="text-[.8rem]">알뜰 추천</span>
                                        </div>
                                    )}
                                    <p className="text-[1.6rem] font-semibold mb-[1rem]">{reportResult.location} 지역 <span className="text-rose-400">{pkg.title}</span> 결과</p>

                                    <ul className="space-y-[.1rem] text-[1.2rem]">
                                        {pkg.extraCosts.map(item => {
                                            return (
                                                <li>{item.name} : {item.amount}만 원</li>
                                            )
                                        })}
                                    </ul>

                                    <p className="text-[1.4rem] font-bold mt-[2rem]">총 합계: <span className="text-rose-500">{pkg.totalSpent}만 원</span></p>
                                </div>
                            )
                        }) 
                    )}
                </div>

            </div>
        </div>
    )
}
