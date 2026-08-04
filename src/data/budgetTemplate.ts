import { Budget } from "@/types/doori";
import { Building2, Camera, Gem, Plane, MoreHorizontal } from "lucide-react";

// 예산 배분 요약데이터
export const DEFAULT_BUDGET_TEMPLATE: Budget.Item[] = [
    {
        id: "b1",
        icon: Building2,
        category: "웨딩홀",
        categoryRatio: 40,
        standardRangeText: "1,200~1,600만 원",
        targetAmount: 0,   // 예상 지출액
        actualAmount: null,   // 실제 지출액
        aiAdvice: "강남 지역 보증인원 200명 기준 적정 범위입니다. 일요일 골든타임 선택 시 대관료 절감이 가능해요.",
    },
    {
        id: "b2",
        icon: Camera,
        category: "스드메",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 0,   // 예상 지출액
        actualAmount: null,   // 실제 지출액
        aiAdvice: "토탈 샵 패키지로 기본 비용을 맞추었습니다. 원본 데이터 수령비와 헬퍼비 추가금을 사전 확인하세요.",
    },
    {
        id: "b3",
        icon: Gem,
        category: "예물/반지",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 0,   // 예상 지출액
        actualAmount: null,   // 실제 지출액
        aiAdvice: "청담동 디자이너 샵 자체 제작 기준 목표 예산 내에서 훌륭하게 맞추셨습니다.",
    },
    {
        id: "b4",
        icon: Plane,
        category: "신혼여행",
        categoryRatio: 15,
        standardRangeText: "400~600만 원",
        targetAmount: 0,   // 예상 지출액
        actualAmount: null,   // 실제 지출액
        aiAdvice: "출발 6개월 전 항공권을 예약하면 비즈니스 업그레이드 프로모션을 노려볼 수 있습니다.",
    },
    {
        id: "b5",
        icon: MoreHorizontal,
        category: "기타",
        categoryRatio: 15,
        standardRangeText: "200~400만 원",
        targetAmount: 0,   // 예상 지출액
        actualAmount: null,   // 실제 지출액
        aiAdvice: "본식 당일 수발비 및 도우미 현금 지급용 예비비로 최소 100만 원 세팅을 권장합니다.",
    },
];