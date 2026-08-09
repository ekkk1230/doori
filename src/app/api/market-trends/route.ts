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
        updatedAt: `${currentYear}년 기준`,
        quarters: [
            {
                quarter: "1분기 (1~3월)",
                season: "겨울/초봄 비수기, 프로모션 및 잔여 타임 할인 증가",
                metroHall: "1,500만 ~ 2,500만 원",
                metroSdm: "300만 ~ 450만 원",
                metroJewelry: "250만 ~ 400만 원",
                metroHoneymoon: "400만 ~ 600만 원",
                metroEtc: "250만 ~ 350만 원",
                localHall: "1,100만 ~ 1,800만 원",
                localSdm: "250만 ~ 400만 원",
                localJewelry: "200만 ~ 350만 원",
                localHoneymoon: "400만 ~ 600만 원",
                localEtc: "200만 ~ 300만 원",
            },
            {
                quarter: "2분기 (4~6월)",
                season: "봄 성수기, 예식 수요 집중 및 가격 상승",
                metroHall: "1,800만 ~ 2,800만 원",
                metroSdm: "350만 ~ 500만 원",
                metroJewelry: "250만 ~ 450만 원",
                metroHoneymoon: "450만 ~ 650만 원",
                metroEtc: "250만 ~ 350만 원",
                localHall: "1,300만 ~ 2,100만 원",
                localSdm: "300만 ~ 450만 원",
                localJewelry: "200만 ~ 400만 원",
                localHoneymoon: "450만 ~ 650만 원",
                localEtc: "200만 ~ 300만 원",
            },
            {
                quarter: "3분기 (7~9월)",
                season: "여름 비수기, 휴가철 및 무더위 할인 조건",
                metroHall: "1,600만 ~ 2,400만 원",
                metroSdm: "300만 ~ 450만 원",
                metroJewelry: "250만 ~ 400만 원",
                metroHoneymoon: "400만 ~ 600만 원",
                metroEtc: "250만 ~ 350만 원",
                localHall: "1,200만 ~ 1,700만 원",
                localSdm: "250만 ~ 400만 원",
                localJewelry: "200만 ~ 350만 원",
                localHoneymoon: "400만 ~ 600만 원",
                localEtc: "200만 ~ 300만 원",
            },
            {
                quarter: "4분기 (10~12월)",
                season: "가을 성수기, 골든 타임 선호로 비용 상승",
                metroHall: "1,900만 ~ 3,000만 원",
                metroSdm: "350만 ~ 550만 원",
                metroJewelry: "250만 ~ 450만 원",
                metroHoneymoon: "450만 ~ 650만 원",
                metroEtc: "250만 ~ 350만 원",
                localHall: "1,400만 ~ 2,200만 원",
                localSdm: "300만 ~ 450만 원",
                localJewelry: "200만 ~ 400만 원",
                localHoneymoon: "450만 ~ 650만 원",
                localEtc: "200만 ~ 300만 원",
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
            2. 주요 5개 카테고리(웨딩홀/식대, 스드메, 예물/반지, 신혼여행, 기타) 항목별 시세를 수도권과 지방으로 나누어 산출할 것.
            3. 각 분기별 계절 특성(비수기/성수기/프로모션 등) 명시.

            [JSON 응답 포맷 예시 - 마크다운 없이 순수 JSON만 반환]
            {
                "updatedAt": "${currentYear}년 실시간 분석",
                "quarters": [
                    {
                        "quarter": "1분기 (1~3월)",
                        "season": "겨울/초봄 비수기",
                        "metroHall": "1,500만 ~ 2,500만 원",
                        "metroSdm": "300만 ~ 450만 원",
                        "metroJewelry": "250만 ~ 400만 원",
                        "metroHoneymoon": "400만 ~ 600만 원",
                        "metroEtc": "250만 ~ 350만 원",
                        "localHall": "1,100만 ~ 1,800만 원",
                        "localSdm": "250만 ~ 400만 원",
                        "localJewelry": "200만 ~ 350만 원",
                        "localHoneymoon": "400만 ~ 600만 원",
                        "localEtc": "200만 ~ 300만 원"
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

