import { Budget, Vendor } from "@/types/doori";
import { Building2, Camera, Gem, Plane, MoreHorizontal } from "lucide-react";

// 유저 온보딩/기본 입력 데이터 (단위: 만 원으로 통일)
export const MOCK_USER_INPUT: Budget.UserInput = {
    weddingDate: "2027-04-24",
    periodMonths: 8,
    budgetTier: "표준",
    totalBudget: 3500,
    location: "서울 강남구",
    guestCount: 220,
};

// 예산 배분 요약데이터
export const MOCK_BUDGET_SUMMARY: Budget.Item[] = [
    {
        id: "b1",
        icon: Building2,
        category: "웨딩홀",
        categoryRatio: 40,
        standardRangeText: "1,200~1,600만 원",
        targetAmount: 1400,   // 예상 지출액
        actualAmount: 1400,   // 실제 지출액
        aiAdvice: "강남 지역 보증인원 200명 기준 적정 범위입니다. 일요일 골든타임 선택 시 대관료 절감이 가능해요.",
    },
    {
        id: "b2",
        icon: Camera,
        category: "스드메",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 500,   // 예상 지출액
        actualAmount: 500,   // 실제 지출액
        aiAdvice: "토탈 샵 패키지로 기본 비용을 맞추었습니다. 원본 데이터 수령비와 헬퍼비 추가금을 사전 확인하세요.",
    },
    {
        id: "b3",
        icon: Gem,
        category: "예물/반지",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 500,   // 예상 지출액
        actualAmount: 480,   // 실제 지출액
        aiAdvice: "청담동 디자이너 샵 자체 제작 기준 목표 예산 내에서 훌륭하게 맞추셨습니다.",
    },
    {
        id: "b4",
        icon: Plane,
        category: "신혼여행",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 500,   // 예상 지출액
        actualAmount: 0,   // 실제 지출액
        aiAdvice: "출발 6개월 전 항공권을 예약하면 비즈니스 업그레이드 프로모션을 노려볼 수 있습니다.",
    },
    {
        id: "b5",
        icon: MoreHorizontal,
        category: "기타",
        categoryRatio: 10,
        standardRangeText: "200~400만 원",
        targetAmount: 300,   // 예상 지출액
        actualAmount: 100,   // 실제 지출액
        aiAdvice: "본식 당일 수발비 및 도우미 현금 지급용 예비비로 최소 100만 원 세팅을 권장합니다.",
    },
];

// 계약 진단 및 분석 데이터
export const MOCK_CONTRACT_ANALYSIS: Budget.ComparisonReport = {
    location: "서울 강남구",
    weddingMonth: 4,
    userTotalSpent: 3380,
    marketAverageTotal: 3500,
    savedAmount: 120,
    savedPercent: 3.4,
    evaluationBadge: "최저 (아주 잘함)",
    comparedVendors: ["아펠가모 선릉", "더클래스 청담", "노블발렌티 삼성"],
    itemAnalyses: [
        {
            category: "웨딩홀",
            targetAmount: 1400,
            actualAmount: 1400,
            diffAmount: 0,
            aiTip: "강남 평균 대비 예산 범위 내에서 대관료 방어를 아주 잘 하셨습니다.",
        },
        {
            category: "예물/반지",
            targetAmount: 500,
            actualAmount: 480,
            diffAmount: -20,
            aiTip: "목표 금액 대비 20만 원을 아끼셨습니다!",
        },
    ],
    overallDiagnosis:
        "전체 예산(3,500만 원) 대비 약 120만 원을 절약하고 계시는 매우 이상적인 플랜입니다. 현 상태를 유지하시면 추가 지출 없이 본식까지 무난하게 완주하실 수 있습니다.",
};

// 업체 지도/추천 데이터
export const MOCK_VENDORS: Vendor.Item[] = [
    {
        id: "v1",
        name: "아펠가모 선릉",
        category: "웨딩홀",
        rating: 4.8,
        address: "서울 강남구 테헤란로 322",
        priceTag: "식대 7만~8만 원대",
        lat: 37.5045,
        lng: 127.0489,
    },
    {
        id: "v2",
        name: "더클래스 청담",
        category: "웨딩홀",
        rating: 4.7,
        address: "서울 강남구 압구정로 79길",
        priceTag: "하우스웨딩 / 대관료 별도",
        lat: 37.5268,
        lng: 127.0452,
    },
    {
        id: "v3",
        name: "반조에 청담",
        category: "예물",
        rating: 4.9,
        address: "서울 강남구 삼성로 149길",
        priceTag: "웨딩밴드 커플링 300만 원대",
        lat: 37.5195,
        lng: 127.0512,
    },
];