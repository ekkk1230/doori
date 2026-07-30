import { Budget } from "@/types/doori";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { location, weddingMonth, contractInputs } = body as {
            location: string;
            weddingMonth: string,
            contractInputs: Budget.ContractInput[];
        };

        const parsedMonth = typeof weddingMonth === "string" ? parseInt(weddingMonth, 10) : weddingMonth;
        const userInputSummary = contractInputs.map(item => `- [${item.category}] ${item.vendorName || "미정"}: ${item.contractAmount}만 원 (메모: ${item.details || "없음"})`).join("\n");

        const prompt = `
            너는 대한민국 결혼 준비 및 웨딩 견적 분석 전문가 AI야.
            유저가 입력한 계약 견적 정보를 바탕으로, 해당 지역(${location}) 및 예식 월(${weddingMonth}월)의 시장 시세와 비교 분석한 리포트를 생성해줘.
            
            [유저 입력 정보]
            - 예식 지역: ${location}
            - 예식 월: ${parsedMonth}월
            - 유저 계약/견적 목록 (※ 웨딩홀은 대관료 + 식대를 합산한 총 비용 기준, 단위: 만 원):
            ${userInputSummary}
            
            [분석 요구사항 및 권역 기준 규칙]
            1. **행정구역 기반 현실적 시세 반영:**
            - **웨딩홀:** 유저가 입력한 '${location}' 시/군/구 내의 대표 웨딩홀 시세를 적용하고, 비수기/프로모션/잔여타임 할인을 감안한 실제 계약 평균가를 산출해줘.
            - **스드메 / 예물·예복:** 
                * 입력된 위치가 **수도권(서울/경기/인천)**인 경우: 스드메 메카인 **서울(강남/청담/종로)**의 대표 시세를 기준으로 분석해줘.
                * 입력된 위치가 **지방**인 경우: 해당 시/구와 **가장 가까운 대도시/광역시 거점 상권**(예: 구미→대구, 익산→전주, 강릉→원주/서울 등)의 시세를 자동으로 매핑하여 분석해줘.
            2. 유저의 총 지출액(userTotalSpent)과 시장 평균 총액(marketAverageTotal)을 계산하고, 차액(savedAmount = marketAverageTotal - userTotalSpent)을 만원 단위 숫자로 산출해줘.
            3. 유저가 선택한 각 카테고리별로 인근 및 관련 권역에서 예비 부부들이 많이 비교하는 대표적인 타 업체 3곳(comparedVendors)을 추천 리스트로 뽑아줘.
            4. 카테고리별로 유저 지출액과 시장 평균액, 그리고 네고/프로모션 팁이 담긴 짧은 1줄 AI 꿀팁(aiTip)을 작성해줘.
            5. 마크다운 기호 없이 순수 텍스트를 써서 아래 지시된 JSON 구조로만 정확하게 응답해줘.
            
            [JSON 응답 포맷]
            {
                "location": "${location}",
                "weddingMonth": ${weddingMonth},
                "userTotalSpent": 숫자(만원단위),
                "marketAverageTotal": 숫자(만원단위),
                "savedAmount": 숫자(만원단위, 절감이면 양수, 초과면 음수),
                "savedPercent": 숫자(백분율, 예: 10),
                "evaluationBadge": "최저 (아주 잘함)" | "적정 (평균)" | "주의 (초과)" 중 하나,
                "comparedVendors": ["업체A", "업체B", "업체C"],
                "itemAnalyses": [
                    {
                    "category": "웨딩홀",
                    "targetAmount": 숫자,
                    "actualAmount": 숫자,
                    "diffAmount": 숫자,
                    "aiTip": "1줄 꿀팁 텍스트"
                    }
                ],
                "overallDiagnosis": "전체 예산 집행에 대한 친절하고 전문적인 AI 총평"
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                // tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
            },
        });

        if (!response.text) { throw new Error("AI 응답 데이터가 없습니다.") };

        const reportData: Budget.ComparisonReport = JSON.parse(response.text);
        return NextResponse.json(reportData);

    } catch (err) {
        console.error("AI Report Generation Error:", err);
        return NextResponse.json(
            { error: "리포트 생성 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}