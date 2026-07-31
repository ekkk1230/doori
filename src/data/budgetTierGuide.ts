import { Budget } from "@/types/doori";

export const BUDGET_TIER_GUIDES: Record<Budget.CategoryKey , Record<Budget.TierKey, Budget.TierGuideDetail>> = {
    웨딩홀: {
        가성비: { tierGuideText: "스몰/공공예식장/야외", standardRangeText: "800~1,200만 원", recommendedRatio: 40 },
        표준: { tierGuideText: "호텔/전문홀 중급", standardRangeText: "1,500~2,500만 원", recommendedRatio: 45 },
        초호화: { tierGuideText: "5성급 특호텔/단독홀", standardRangeText: "3,000만 원 이상", recommendedRatio: 50 },
    },
    스드메: {
        가성비: { tierGuideText: "알뜰 세미촬영/셀프", standardRangeText: "150~250만 원", recommendedRatio: 15 },
        표준: { tierGuideText: "인기 스드메 조합", standardRangeText: "300~450만 원", recommendedRatio: 15 },
        초호화: { tierGuideText: "하이엔드 드레스/독점 촬영", standardRangeText: "600만 원 이상", recommendedRatio: 15 },
    },
    "예물/반지": {
        가성비: { tierGuideText: "종로/심플 커플링 위주", standardRangeText: "100~200만 원", recommendedRatio: 10 },
        표준: { tierGuideText: "18K/플래티넘 풀세팅", standardRangeText: "250~400만 원", recommendedRatio: 15 },
        초호화: { tierGuideText: "명품 브랜드 쥬얼리", standardRangeText: "700만 원 이상", recommendedRatio: 15 },
    },
    신혼여행: {
        가성비: { tierGuideText: "국내/동남아 단기", standardRangeText: "200~300만 원", recommendedRatio: 15 },
        표준: { tierGuideText: "동남아/남태평양 5일", standardRangeText: "400~600만 원", recommendedRatio: 15 },
        초호화: { tierGuideText: "유럽/하와이 장기 비즈니스", standardRangeText: "1,000만 원 이상", recommendedRatio: 10 },
    },
    기타: {
        가성비: { tierGuideText: "최소 실비 유휴금", standardRangeText: "100~200만 원", recommendedRatio: 20 },
        표준: { tierGuideText: "일반적인 기타 비용", standardRangeText: "250~350만 원", recommendedRatio: 10 },
        초호화: { tierGuideText: "여유로운 예비비 편성", standardRangeText: "500만 원 이상", recommendedRatio: 10 },
    },
  };