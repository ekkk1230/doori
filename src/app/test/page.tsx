"use client";

import { useDooriStore } from "@/store/useDooriStore";
import { Budget } from "@/types/doori";
import { useState } from "react";

export default function ApiTestPage() {
  const { weddingDate } = useDooriStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 지역별 테스트 케이스
  const testCases: Record<string, { location: string; weddingDate: string; guestCount: number; contractInputs: Budget.ContractInput[] }> = {
    seoul: {
      location: "경기 광명",
      weddingDate: weddingDate,
      guestCount: 250,
      contractInputs: [
        { category: "웨딩홀/식대", vendorName: "광명무역센터컨벤션", location: "경기 광명", contractAmount: 1400, details: "잔여타임 프로모션 적용" },
        { category: "스드메", vendorName: "청담 스드메 패키지", location: "서울 강남구", contractAmount: 350, details: "드레스 투어 2곳" },
      ],
    },
    anyang: {
      location: "경기 안양",
      weddingDate: "2027-02-08",
      guestCount: 200,
      contractInputs: [
        { category: "웨딩홀/식대", vendorName: "더블룸 웨딩홀", location: "경기 안양시", contractAmount: 1600, details: "보증인원 200명" },
        { category: "스드메", vendorName: "청담 스튜디오 연계", location: "서울 강남구", contractAmount: 300, details: "메이크업 원장 지정" },
      ],
    },
    gumi: {
      location: "경기 하남",
      weddingDate: weddingDate,
      guestCount: 300,
      contractInputs: [
        { category: "웨딩홀/식대", vendorName: "하남컨벤션웨딩홀", location: "경기 하남", contractAmount: 4500, details: "비수기 할인" },
        { category: "스드메", vendorName: "오모나", location: "경기 하남", contractAmount: 680, details: "드레스 투어 2곳" },
      ],
    },
  };

  // 1. 신규: 분기별 시세표 API 테스트 (GET /api/market-trends)
  const handleTestMarketTrends = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/market-trends");
      const data = await res.json();
      console.log("📊 [분기별 시세표] AI 응답:", data);
      setResult(data);
    } catch (err) {
      console.error("시세표 테스트 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. 기존: 견적 비교 분석 리포트 API 테스트 (POST /api/compare-report)
  const handleTestApi = async (key: string) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/compare-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testCases[key]),
      });

      const data = await res.json();
      console.log(`🔥 [${testCases[key].location}] AI 응답:`, data);
      setResult(data);
    } catch (err) {
      console.error("테스트 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>🧪 Gemini 3.1 Flash Lite API 테스트</h2>
      <p>분기별 시세 데이터 조회 및 지역별 권역 자동 매핑 테스트를 진행하세요.</p>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {/* 분기별 시세표 버튼 (초록색) */}
        <button onClick={handleTestMarketTrends} disabled={loading} style={marketBtnStyle}>
          📊 0. 분기별 시세표 API (GET)
        </button>

        {/* 기존 리포트 분석 버튼들 (보라색) */}
        <button onClick={() => handleTestApi("seoul")} disabled={loading} style={btnStyle}>
          1. 경기 광명 테스트
        </button>
        <button onClick={() => handleTestApi("anyang")} disabled={loading} style={btnStyle}>
          2. 경기 안양시 테스트
        </button>
        <button onClick={() => handleTestApi("gumi")} disabled={loading} style={btnStyle}>
          3. 경기 하남 테스트
        </button>
      </div>

      {loading && <p>⏳ AI 데이터를 가져오고 분석 중입니다...</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ 받아온 분석 데이터:</h3>
          <pre style={preStyle}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: "10px 18px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const marketBtnStyle = {
  ...btnStyle,
  backgroundColor: "#059669", // 시세표 테스트는 초록색으로 구분
};

const preStyle = {
  background: "#1e1e1e",
  color: "#00ff66",
  padding: "20px",
  borderRadius: "8px",
  overflowX: "auto" as const,
};