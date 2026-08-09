import { Budget } from "@/types/doori";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// 웨딩 시세 5개 고정 카테고리 ↔ market-trends 분기 데이터 필드 매핑
const CATEGORY_FIELD_MAP: { category: string; metroKey: string; localKey: string }[] = [
    { category: "웨딩홀/식대", metroKey: "metroHall", localKey: "localHall" },
    { category: "스드메", metroKey: "metroSdm", localKey: "localSdm" },
    { category: "예물/반지", metroKey: "metroJewelry", localKey: "localJewelry" },
    { category: "신혼여행", metroKey: "metroHoneymoon", localKey: "localHoneymoon" },
    { category: "기타", metroKey: "metroEtc", localKey: "localEtc" },
];

// "1,500만 ~ 2,500만 원" 같은 범위 텍스트를 평균값(만 원 단위)으로 변환
function parseRangeAverage(rangeText?: string): number {
    const numbers = rangeText?.replace(/,/g, "").match(/\d+/g)?.map(Number) ?? [];
    if (numbers.length === 0) return 0;
    return Math.round(numbers.reduce((sum, n) => sum + n, 0) / numbers.length);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const { location, weddingDate, guestCount, contractInputs, marketTrends } = body as {
            location: string;
            weddingDate: string;
            guestCount?: number | string;
            contractInputs: Budget.ContractInput[];
            marketTrends?: any;
        };

        // 1. 예식 연월 및 하객 수 파싱
        const [weddingYear, weddingMonth] = weddingDate.split('-');
        const parsedYear = parseInt(weddingYear, 10);
        const parsedMonth = parseInt(weddingMonth, 10);
        const parsedGuestCount = typeof guestCount === "string" ? parseInt(guestCount, 10) || 200 : (guestCount || 200);

        //2. 분기 계산 및 실시간 시세 기준 추출
        const quarterIndex = Math.ceil(parsedMonth / 3) - 1;
        const activeQuarter = marketTrends?.quarters?.[quarterIndex];

        // 수도권 여부 확인
        const isMetro = location.includes("서울") || location.includes("경기") || location.includes("인천");

        // 유저 실제 계약 견적 (미입력 카테고리는 0원)
        const userExtraCosts = CATEGORY_FIELD_MAP.map(({ category }) => {
            const matched = contractInputs.find(input => input.category === category);
            return { name: category, amount: matched?.contractAmount ?? 0 };
        });
        const userTotalSpent = userExtraCosts.reduce((sum, item) => sum + item.amount, 0);

        // 해당 분기 · 지역 시장 표준 견적 (시세 범위의 평균값)
        const recommendedExtraCosts = CATEGORY_FIELD_MAP.map(({ category, metroKey, localKey }) => {
            const rangeText = activeQuarter?.[isMetro ? metroKey : localKey];
            return { name: category, amount: parseRangeAverage(rangeText) };
        });
        const recommendedTotalSpent = recommendedExtraCosts.reduce((sum, item) => sum + item.amount, 0);

        const packageComparison: Budget.ComparisonReport["packageComparison"] = {
            userPackage: {
                title: `${activeQuarter?.quarter ?? `${quarterIndex + 1}분기`} 내 견적`,
                baseAmount: 0,
                extraCosts: userExtraCosts,
                totalSpent: userTotalSpent,
            },
            recommendedPackage: {
                title: `${activeQuarter?.quarter ?? `${quarterIndex + 1}분기`} 시장 표준 견적`,
                baseAmount: 0,
                extraCosts: recommendedExtraCosts,
                totalSpent: recommendedTotalSpent,
            },
        };

        // 시세 범위
        const targetHallRange = activeQuarter
            ? (isMetro ? activeQuarter.metroHall : activeQuarter.localHall)
            : "1,500만 ~ 2,500만 원";

        const targetSdmRange = activeQuarter
            ? (isMetro ? activeQuarter.metroSdm : activeQuarter.localSdm)
            : "250만 ~ 450만 원";
        
        // 3. 유저 입력 견적 목록 텍스트
        const userInputSummary = contractInputs
            .map(item => `- [${item.category}]: ${item.contractAmount}만 원`)
            .join("\n");

        // 4. 동적 주입 프롬프트 생성
        const prompt = `
            너는 대한민국 결혼 준비 및 웨딩 견적 분석 전문가 AI야.
            유저가 입력한 계약 견적 정보를 바탕으로, 선택한 지역(${location}) 및 예식 연월(${parsedYear}년 ${parsedMonth}월)의 현실적인 시장 시세와 비교 분석한 리포트를 생성해줘.
            
            [유저 입력 정보]
            - 예식 지역: ${location} (${isMetro ? "수도권" : "지방"} 권역)
            - 예식 연월: ${parsedYear}년 ${parsedMonth}월
            - 하객 예상 인원: ${parsedGuestCount}명
            - 유저 계약/견적 목록 (※ 단위: 만 원):
            ${userInputSummary}

            [★ 실시간 ${parsedYear}년 ${quarterIndex + 1}분기 시장 시세 기준 (★최우선 지침★)]
            아래 시세 데이터는 현재 서비스에서 실시간으로 산출한 정식 시세 기준표이다. 이 실시간 시세 범위를 기준으로 targetAmount 및 차액을 계산해라:
            - **웨딩홀 (${parsedGuestCount}명 기준 시장가 범위):** ${targetHallRange} (시즌 특성: ${activeQuarter?.season || "성수기/비수기 반영"})
            - **스드메 (패키지 기준 시장가 범위):** ${targetSdmRange}
            
            [★ 서버에서 이미 확정 계산한 수치 (그대로 사용할 것, 재계산 금지) ★]
            - userTotalSpent = ${userTotalSpent} (만 원)
            - marketAverageTotal = ${recommendedTotalSpent} (만 원)
            - savedAmount = marketAverageTotal - userTotalSpent = ${recommendedTotalSpent - userTotalSpent} (만 원)
            - savedPercent = ${recommendedTotalSpent > 0 ? Math.round(((recommendedTotalSpent - userTotalSpent) / recommendedTotalSpent) * 100) : 0} (%)

            [JSON 응답 포맷]
            {
                "location": "${location}",
                "weddingMonth": ${parsedMonth},
                "userTotalSpent": ${userTotalSpent},
                "marketAverageTotal": ${recommendedTotalSpent},
                "savedAmount": ${recommendedTotalSpent - userTotalSpent},
                "savedPercent": ${recommendedTotalSpent > 0 ? Math.round(((recommendedTotalSpent - userTotalSpent) / recommendedTotalSpent) * 100) : 0},
                "evaluationBadge": "최저 (아주 잘함)" | "적정 (평균)" | "주의 (초과)",
                "itemAnalyses": [
                {
                    "category": "카테고리명",
                    "targetAmount": 숫자(위에서 제시한 동적 시장평균가 반영),
                    "actualAmount": 숫자(유저입력가),
                    "diffAmount": 숫자(차액),
                    "marketAverageRange": "${location} ${activeQuarter?.quarter || ""} 시세 기준 (${targetHallRange})",
                    "aiTip": "${parsedYear}년 ${parsedMonth}월 예식 및 하객수(${parsedGuestCount}명)를 반영한 1줄 시세 분석 팁"
                }
                ],
                "hiddenCostsGuide": [
                {
                    "title": "추가금 항목명",
                    "desc": "추가금 관련 설명 및 평균 예상 비용 범위"
                }
                ],
                "contractChecklist": [
                "계약 전 체크리스트 문항 1",
                "계약 전 체크리스트 문항 2"
                ],
                "overallDiagnosis": "${parsedYear}년 현실 물가와 하객 수를 고려한 전문가 AI 총평"
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                // tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                temperature: 0.1
            },
        });

        if (!response.text) {
            throw new Error("AI 응답 데이터가 없습니다.");
        }

        // 혹시 모를 마크다운 래핑 제거 후 파싱 (안전 장치)
        const cleanedText = response.text.replace(/```json|```/g, "").trim();
        const reportData: Budget.ComparisonReport = JSON.parse(cleanedText);

        // packageComparison은 AI가 아닌 서버에서 계산한 값으로 항상 덮어써서
        // 유저 미입력 시 0원, 시장 표준은 실제 시세 평균이 정확히 반영되도록 함
        reportData.packageComparison = packageComparison;

        return NextResponse.json(reportData);

    } catch (err) {
        console.error("AI Report Generation Error:", err);
        return NextResponse.json(
            { error: "리포트 생성 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}