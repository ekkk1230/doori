"use client";

import { useDooriStore } from "@/store/useDooriStore";
import { useUiStore } from "@/store/useUiStore";
import { Budget } from "@/types/doori";
import { Camera, Check, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface QuarterData {
    quarter: string;
    season: string;
    metroHall: string;
    metroSdm: string;
    metroJewelry: string;
    metroHoneymoon: string;
    metroEtc: string;
    localHall: string;
    localSdm: string;
    localJewelry: string;
    localHoneymoon: string;
    localEtc: string;
}

interface MarketTrendsResult {
    updatedAt: string;
    quarters: QuarterData[];
    isFallback: boolean;
}

interface CompareCardProps {
    pkgKey: string;
    pkg: {
        title: string;
        totalSpent: number;
        extraCosts: { name: string; amount: number }[];
    };
    location: string;
    isWinner: boolean;
}

const FIXED_CATEGORIES = [
    "웨딩홀/식대",
    "스드메",
    "예물/반지",
    "신혼여행",
    "기타"
];

const CATEGORY_COLORS = [
    "#f43f5e", // 웨딩홀/식대 (Rose)
    "#6366f1", // 스드메 (Indigo)
    "#10b981", // 예물/반지 (Emerald)
    "#f59e0b", // 신혼여행 (Amber)
    "#8b5cf6", // 기타 (Purple)
];

function CompareCard({ pkgKey, pkg, location, isWinner }: CompareCardProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    
    const normalizedExtraCosts = FIXED_CATEGORIES.map((catName, idx) => {
        const found = pkg?.extraCosts?.find(
            item => item.name.includes(catName.split("/")[0]) || catName.includes(item.name)
        );

        return {
            name: catName,
            amount: found ? found.amount : 0,
            color: CATEGORY_COLORS[idx], 
        };
    });

    useEffect(() => {
        if (!chartRef.current || !pkg?.extraCosts || pkg.extraCosts.length === 0) return;

        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }

        const chartData = normalizedExtraCosts
            .filter(item => item.amount > 0)
            .map((item) => ({
                value: item.amount,
                name: item.name,
                itemStyle: { color: item.color }, 
            }));

        const option: echarts.EChartsOption = {
            animation: false,
            color: CATEGORY_COLORS,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}만 원 ({d}%)',
            },
            legend: {
                show: false, 
            },
            series: [
                {
                    name: pkg.title,
                    type: 'pie',
                    radius: ['45%', '75%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 6,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: { show: false },
                    labelLine: { show: false },
                    data: chartData,
                },
            ],
        };

        myChart.setOption(option, true);

        const handleResize = () => myChart?.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [pkg]);

    return (
        <div className={`gless-card w-full relative ${isWinner ? 'border-solid border-[.2rem] border-emerald-500 shadow-emerald-300' : ''}`}>
            {isWinner && (
                <div className="text-center rounded-[50%] w-[4.8rem] h-[4.8rem] flex flex-col items-center justify-center border-solid border-emerald-500 border-[.1rem] text-emerald-500 font-semibold absolute top-[2rem] right-[2rem]">
                    <ThumbsUp className="w-[1.6rem] h-[1.6rem] mx-auto mb-[.2rem]" />
                    <span className="text-[.8rem]">알뜰 추천</span>
                </div>
            )}
            <p className="text-[1.6rem] font-semibold mb-[1rem]">
                <span className="text-rose-400">{location} 지역 {pkg.title}</span> 결과
            </p>

            <div className="flex gap-[2rem] justify-between items-center">
                <ul className="space-y-[0.8rem] text-[1.3rem] flex-1">
                    {normalizedExtraCosts.map((item) => (
                        <li 
                            key={item.name}
                            className="flex items-center justify-between font-medium"
                            style={{ color: item.amount > 0 ? item.color : "#cbd5e1" }}
                        >
                            <span>{item.name}</span>
                            <span>{item.amount > 0 ? `${item.amount.toLocaleString()}만 원` : '미입력'}</span>
                        </li>
                    ))}
                </ul>

                <div ref={chartRef} className="w-[20rem] h-[20rem] my-[1rem]" />
            </div>

            <p className="text-[1.4rem] font-bold mt-[1rem]">
                총 합계: <span className="text-rose-500">{(pkg.totalSpent ?? 0).toLocaleString()}만 원</span>
            </p>
        </div>
    );
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
                }));

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
    };

    const badgeClass = reportResult?.evaluationBadge.includes('최저') ? 'bg-blue-50 text-blue-700' : reportResult?.evaluationBadge.includes('적정') ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-700'

    // console.log(reportResult)

    return (
        <div className="container">
            <div className="gradient-card rounded-[1.6rem] p-[2rem] w-full">
                <p className="text-white text-[1.6rem] flex items-center mb-[1rem] tit">
                    <Camera className="mr-[.8rem] w-[2rem] h-[2rem]" />견적 비교 및 분석
                </p>
                <p className="tit text-[3rem] text-bold text-white">{location}·{budgetTier} 라인 실제 계약 분석 </p>
            </div>

            <div className="my-[4rem]">
                <div className="flex items-end justify-between mb-[1.4rem] gap-[1rem]">
                    <p className="tit text-[2rem]">한눈에 보는 {curYear} 웨딩 시세표</p>
                    <p className="flex relative top-[-.5rem] items-center gap-[.4rem] before:content-['※'] text-rose-400 font-bold text-[1.2rem]">
                        AI로 분석된 정보입니다. 실제 시세와 차이가 있을 수 있으니 참고용으로 활용하시기 바랍니다.
                    </p>
                </div>

                {isLoading ? (
                    <div className="w-full h-48 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-500 text-[1.4rem]">실시간 시세 데이터를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto rounded-[1.2rem] border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50 border-b text-center border-slate-200 text-[1.3rem] text-slate-600">
                                    <th className="p-4 font-semibold w-[8%]">분기</th>
                                    <th className="p-4 font-semibold w-[19%]">시즌 특징</th>
                                    <th className="p-4 font-semibold text-center bg-indigo-50/50 text-indigo-950" colSpan={5}>
                                        수도권 (서울/경기/인천)
                                    </th>
                                    <th className="p-4 font-semibold text-center bg-emerald-50/50 text-emerald-950" colSpan={5}>
                                        지방 거점 도시
                                    </th>
                                </tr>
                                <tr className="bg-slate-50/70 border-b border-slate-200 text-[1.2rem] text-slate-500 text-center">
                                    <th className="p-2 border-r border-slate-100"></th>
                                    <th className="p-2 border-r border-slate-100"></th>
                                    <th className="p-2 border-r border-slate-100 bg-indigo-50/30">웨딩홀/식대</th>
                                    <th className="p-2 border-r border-slate-100 bg-indigo-50/30">스드메</th>
                                    <th className="p-2 border-r border-slate-100 bg-indigo-50/30">예물/반지</th>
                                    <th className="p-2 border-r border-slate-100 bg-indigo-50/30">신혼여행</th>
                                    <th className="p-2 border-r border-slate-100 bg-indigo-50/30">기타</th>
                                    <th className="p-2 border-r border-slate-100 bg-emerald-50/30">웨딩홀/식대</th>
                                    <th className="p-2 border-r border-slate-100 bg-emerald-50/30">스드메</th>
                                    <th className="p-2 border-r border-slate-100 bg-emerald-50/30">예물/반지</th>
                                    <th className="p-2 border-r border-slate-100 bg-emerald-50/30">신혼여행</th>
                                    <th className="p-2 text-center bg-emerald-50/30">기타</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-[1.2rem]">
                                {trendsResult?.quarters?.map((item, idx) => {
                                    const targetMonth = weddingDate ? new Date(weddingDate).getMonth() + 1 : null;
                                    const selectedQuarterNum = targetMonth ? Math.ceil(targetMonth / 3) : null;
                                    const isSelectedQuarter = selectedQuarterNum 
                                        ? item.quarter.includes(`${selectedQuarterNum}분기`) 
                                        : false;

                                    return (
                                        <tr
                                            key={idx}
                                            className={`transition-colors text-center ${
                                                isSelectedQuarter
                                                    ? 'bg-rose-50/70 hover:bg-rose-100/70 font-semibold'
                                                    : 'hover:bg-slate-50/80'
                                            }`}
                                        >
                                            <td className="p-3 font-bold text-slate-900 border-r border-slate-100">{item.quarter}</td>
                                            <td className="p-3 text-slate-600 border-r border-slate-100 text-left leading-relaxed">{item.season}</td>
                                            <td className="p-3 font-medium text-slate-800 border-r border-slate-100 bg-indigo-50/10">{item.metroHall}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-indigo-50/10">{item.metroSdm}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-indigo-50/10">{item.metroJewelry}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-indigo-50/10">{item.metroHoneymoon}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-indigo-50/10">{item.metroEtc}</td>
                                            <td className="p-3 font-medium text-slate-800 border-r border-slate-100 bg-emerald-50/10">{item.localHall}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-emerald-50/10">{item.localSdm}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-emerald-50/10">{item.localJewelry}</td>
                                            <td className="p-3 text-slate-700 border-r border-slate-100 bg-emerald-50/10">{item.localHoneymoon}</td>
                                            <td className="p-3 text-slate-700 bg-emerald-50/10">{item.localEtc}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div>
                <div className="flex items-end justify-between mb-[1.4rem] gap-[1rem]">
                    <p className="tit text-[2rem]">실제 견적 VS 지역 평균 견적 비교</p>
                    <p className="flex relative top-[-.5rem] items-center gap-[.4rem] before:content-['※'] text-rose-400 font-bold text-[1.2rem]">
                        AI로 분석된 평균 견적 정보입니다. 실제 견적 금액과 차이가 있을 수 있으니 참고용으로 활용하시기 바랍니다.
                    </p>
                </div>

                <div className="flex gap-[1rem]">
                    {reportResult?.packageComparison &&
                        Object.entries(reportResult.packageComparison).map(([key, pkg]) => {
                            const userPkg = reportResult.packageComparison.userPackage;
                            const recommendPkg = reportResult.packageComparison.recommendedPackage;

                            const isUserCheaper = userPkg.totalSpent < recommendPkg.totalSpent;
                            const isRecommendCheaper = recommendPkg.totalSpent < userPkg.totalSpent;

                            const isWinner =
                                (key === "userPackage" && isUserCheaper) ||
                                (key === "recommendedPackage" && isRecommendCheaper);

                            return (
                                <CompareCard key={key} pkgKey={key} pkg={pkg} location={location} isWinner={isWinner} />
                            );
                        })
                    }
                </div>

                {
                    reportResult && (
                        <>
                            <div className="gless-card my-[2rem]">
                                <p className="tit text-[1.6rem] mb-[1rem]">상세 분석 내용</p>

                                <ul className="space-y-[1rem]">
                                    {reportResult?.itemAnalyses.map(item => {
                                        const spanStyle = `bloc p-[.4rem_1.2rem] rounded-[1.2rem]`;
                                        const saveAmount = item.targetAmount > item.actualAmount ? <span className={`text-blue-700 bg-blue-50 ${spanStyle}`}>{(item.diffAmount).toLocaleString() + '만 원 절약'}</span> : item.targetAmount < item.actualAmount ? <span className={`text-red-700 bg-red-50 ${spanStyle}`}>{(item.diffAmount).toLocaleString() + '만 원 초과'}</span> : <span className={`text-green-700 bg-green-50 ${spanStyle}`}>적정한 평균가입니다!</span>;
                                    
                                        return (
                                            <li key={item.category}
                                                className="text-[1.4rem] gap-[1rem] flex items-center before:content-['-'] before:mx-[.4rem]"
                                            >
                                                <span className={`${spanStyle} text-rose-700 bg-rose-50`}>{item.category}</span>
                                                {saveAmount}
                                                {item.aiTip}
                                            </li>
                                    )})}
                                </ul>
                            </div>

                            <div className="gless-card my-[2rem]">
                                <p className="tit text-[1.6rem] mb-[1rem]">점검사항</p>

                                <ul className="space-y-[1rem]">
                                    {reportResult?.contractChecklist.map((checkItem, idx) => {
                                        return (
                                            <li 
                                                key={idx}
                                                className="flex gap-[.8rem] items-center text-[1.4rem]"
                                            >   
                                                <div className="rounded-[.4rem] bg-emerald-100 flex items-center justify-center p-[.4rem]"><Check className="w-[1.4rem] h-[1.4rem]"/></div>
                                                {checkItem}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="gless-card">
                                <p className="tit text-[1.6rem] mb-[1rem]">총평</p>

                                <div className={`inline-block p-[.4rem_1.2rem] rounded-[1.2rem] mb-[1rem] font-semibold text-[1.2rem] ${badgeClass}`}>{reportResult?.evaluationBadge}</div>

                                <p className="text-[1.4rem] leading-relaxed text-[#555]">{reportResult?.overallDiagnosis}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}