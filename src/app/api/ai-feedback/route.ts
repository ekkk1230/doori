import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            periodMonths, 
            budgetInManwon, 
            usedBudgetInManwon = 0,
            progressPercent, 
            completedTaskTitles = [],    // 완료한 Task 제목 목록
            uncompletedTaskTitles = [],  // 남아있는 Task 제목 목록 (또는 미완료 필수 항목)
        } = body;

        // 남은 잔액
        const remainingBudget = budgetInManwon ? budgetInManwon - usedBudgetInManwon : null;

        const prompt = `
            너는 웨딩 플래너 AI '두리(DOORI)'야. 
            결혼을 준비하는 예비 신랑/신부의 현재 준비 상황, 진행된 항목, 남은 과업, 그리고 예산을 종합 분석해서 2~3줄로 구체적인 핀셋 피드백을 줘.
            
            [유저 현재 상황]
            - 결혼 준비 기간: ${periodMonths}개월 코스
            - 예산 상황: 전체 ${budgetInManwon}만 원 / 현재 지출 ${usedBudgetInManwon}만 원 ${remainingBudget !== null ? `(남은 예산: ${remainingBudget}만 원)` : ''}
            - 현재 진행률: ${progressPercent}%
            
            [체크리스트 현황]
            - 완료한 항목: ${completedTaskTitles.length > 0 ? completedTaskTitles.join(", ") : "없음"}
            - 앞으로 해야 할 핵심 항목: ${uncompletedTaskTitles.length > 0 ? uncompletedTaskTitles.join(", ") : "없음"}
            
            [작성 지침]
            1. 정중하면서도 따뜻한 어조(~해요, ~해보세요)로 작성할 것.
            2. 아직 하지 않은 핵심 항목 중에서 **가장 먼저 서둘러야 할 1~2개 과업**을 명시하고, 남은 예산/일정과 연결 지어 실질적인 팁을 줄 것.
            3. 마크다운 기호 없이 순수 텍스트로 2~3줄로 간결하게 작성할 것.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

        const feedbackText = response.text || "현재 일정을 바탕으로 차근차근 잘 준비하고 계십니다! 다음 단계를 함께 체크해 보세요.";

        return NextResponse.json({ feedback: feedbackText });
    } catch (err) {
        console.error("Gemini API Error:", err);
        return NextResponse.json(
            { error: "AI 피드백을 불러오는 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
};

