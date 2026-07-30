import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const revalidate = 2592000;

export async function GET() {
    const now = new Date();
    const currentYear = new Date().getFullYear();

    const todayFormatted = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const FALLBACK_DATA = {
        updatedAt: "2026년 기준",
        quarters: [
            {
              "quarter": "1분기 (1~3월)",
              "season": "겨울/초봄 비수기, 잔여 타임 할인 및 프로모션 증가",
              "metroHall": "1,600만 ~ 2,400만 원",
              "localHall": "1,100만 ~ 1,700만 원",
              "metroSdm": "300만 ~ 450만 원",
              "localSdm": "250만 ~ 400만 원",
              "metroTotal": "약 1,900만 ~ 2,850만 원",
              "localTotal": "약 1,350만 ~ 2,100만 원"
            },
            {
              "quarter": "2분기 (4~6월)",
              "season": "봄 성수기, 예식 수요 집중 및 인기 날짜 가격 상승",
              "metroHall": "1,900만 ~ 2,800만 원",
              "localHall": "1,400만 ~ 2,100만 원",
              "metroSdm": "350만 ~ 500만 원",
              "localSdm": "300만 ~ 450만 원",
              "metroTotal": "약 2,250만 ~ 3,300만 원",
              "localTotal": "약 1,700만 ~ 2,550만 원"
            },
            {
              "quarter": "3분기 (7~9월)",
              "season": "여름 비수기, 휴가철 영향으로 할인 조건 증가",
              "metroHall": "1,700만 ~ 2,500만 원",
              "localHall": "1,200만 ~ 1,800만 원",
              "metroSdm": "300만 ~ 450만 원",
              "localSdm": "250만 ~ 400만 원",
              "metroTotal": "약 2,000만 ~ 2,950만 원",
              "localTotal": "약 1,450만 ~ 2,200만 원"
            },
            {
              "quarter": "4분기 (10~12월)",
              "season": "가을 성수기, 황금 날짜 선호로 비용 상승",
              "metroHall": "2,000만 ~ 3,000만 원",
              "localHall": "1,500만 ~ 2,200만 원",
              "metroSdm": "350만 ~ 550만 원",
              "localSdm": "300만 ~ 450만 원",
              "metroTotal": "약 2,350만 ~ 3,550만 원",
              "localTotal": "약 1,800만 ~ 2,650만 원"
            }
        ],
        isFallback: true,
    };
    
    try {
        const prompt = `
            너는 대한민국 웨딩 시장 시세 분석 전문가야.
            현재 연도(${currentYear}년) 기준 1분기~4분기 분기별 대한민국 웨딩 평균 시세 데이터를 JSON으로 제공해줘.
            
            [요구사항]
            1. 보증인원 200명 기준.
            2. 수도권(서울/경기)과 지방의 웨딩홀(대관료+식대), 스드메 평균 비용 산출.
            3. 각 분기별 계절 특성(비수기/성수기/프로모션 등) 명시.
            
            [JSON 응답 포맷 예시 - 마크다운 없이 순수 JSON만 반환]
            {
                "updatedAt": "${currentYear}년 실시간 분석",
                "quarters": [
                    {
                        "quarter": "1분기 (1~3월)",
                        "season": "겨울/초봄 비수기",
                        "metroHall": "1,500만 ~ 2,100만 원",
                        "localHall": "1,100만 ~ 1,500만 원",
                        "metroSdm": "250만 ~ 350만 원",
                        "localSdm": "350만 ~ 550만 원",
                        "seoulTotal": "약 2,000만 ~ 2,700만 원",
                        "localTotal": "약 1,500만 ~ 2,000만 원"
                    },
                    {
                        "quarter": "2분기 (4~6월)",
                        "season": "봄 성수기",
                        "metroHall": "2,200만 ~ 2,800만 원",
                        "localHall": "1,500만 ~ 2,000만 원",
                        "metroSdm": "300만 ~ 450만 원",
                        "localSdm": "350만 ~ 550만 원",
                        "seoulTotal": "약 2,800만 ~ 3,600만 원",
                        "localTotal": "약 2,000만 ~ 2,700만 원"
                    },
                    {
                        "quarter": "3분기 (7~9월)",
                        "season": "여름/초가을 비수기",
                        "metroHall": "1,600만 ~ 2,200만 원",
                        "localHall": "1,200만 ~ 1,600만 원",
                        "metroSdm": "250만 ~ 350만 원",
                        "localSdm": "350만 ~ 550만 원",
                        "seoulTotal": "약 2,100만 ~ 2,900만 원",
                        "localTotal": "약 1,600만 ~ 2,100만 원"
                    },
                    {
                        "quarter": "4분기 (10~12월)",
                        "season": "가을/겨울 성수기",
                        "metroHall": "2,000만 ~ 2,600만 원",
                        "localHall": "1,400만 ~ 1,900만 원",
                        "metroSdm": "280만 ~ 400만 원",
                        "localSdm": "350만 ~ 550만 원",
                        "seoulTotal": "약 2,600만 ~ 3,400만 원",
                        "localTotal": "약 1,900만 ~ 2,500만 원"
                    }
                ]
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });
      
        if (!response.text) {
            throw new Error("AI 응답이 비어있습니다.");
        }
      
        const data = JSON.parse(response.text);
        return NextResponse.json({ ...data, updatedAt: `${todayFormatted} AI 실시간 업데이트`, isFallback: false });
    } catch (err) {
        console.error("Market Trends API Error:", err);
        return NextResponse.json(FALLBACK_DATA, { status: 200 });
    }
}

