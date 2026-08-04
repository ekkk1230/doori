import { Budget, Vendor } from "@/types/doori";

// 유저 온보딩/기본 입력 데이터 (단위: 만 원으로 통일)
export const MOCK_USER_INPUT: Budget.UserInput = {
    weddingDate: "2027-04-24",
    periodMonths: 8,
    budgetTier: "표준",
    totalBudget: 3500,
    location: "서울 강남구",
    guestCount: 220,
};

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
            targetAmount: 0,
            actualAmount: null,
            diffAmount: 0,
            aiTip: "강남 평균 대비 예산 범위 내에서 대관료 방어를 아주 잘 하셨습니다.",
        },
        {
            category: "예물/반지",
            targetAmount: 0,
            actualAmount: null,
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