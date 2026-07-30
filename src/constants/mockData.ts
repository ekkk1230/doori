import {
	UserInput,
	ContractAnalysisResult,
	BudgetItem,
	Vendor,
} from "@/types/doori";

// 1. 유저 초기 설정 예시
export const MOCK_USER_INPUT: UserInput = {
	weddingDate: "2027-04-24",
	periodMonths: 8,
	budgetTier: "표준",
	totalBudget: 35000000,
	location: "서울 강남구",
	guestCount: 220
};

// 2. 유저 견적 입력에 대한 AI 비교 진단 예시
export const MOCK_CONTRACT_ANALYSIS: ContractAnalysisResult = {
	userInput: {
		category: "웨딩홀",
		vendorName: "아펠가모 선릉",
		location: "서울 강남구",
		contractAmount: 18000000,
		details: "보증인원 200명 / 일요일 골든타임 / 식대 8만원 대관료 200만원",
	},
	regionalAverage: 19500000, // 강남구 동일 조건 평균
	priceEvaluation: "혜자 (아주 잘함)",
	diffAmount: -1500000, // 평균 대비 150만원 절감
	comparedVendors: ["더클래스 청담", "노블발렌티 삼성", "마리아쥬스퀘어"],
	aiDiagnosis:
		"강남구 보증인원 200명 기준 평균 견적(1,950만 원) 대비 약 150만 원(7.7%)을 절약하신 아주 훌륭한 계약입니다! 특히 일요일 타임을 활용해 대관료를 대폭 낮춘 점이 신의 한 수였습니다. 본식 1달 전 식대 음주류 포함 여부만 최종 체크하세요.",
};

// 3. 예산 항목 예시 (AI 자동 배분 및 계약 데이터 반영)
export const MOCK_BUDGET_ITEMS: BudgetItem[] = [
	{
		id: "b1",
		category: "🏛️ 웨딩홀 & 식대",
		targetAmount: 15750000,
		actualAmount: 18000000,
		percentage: 45,
		aiAdvice:
		"강남 지역 보증인원 200명 기준입니다. 일요일 골든타임을 선택해 대관료를 잘 방어하셨습니다.",
	},
	{
		id: "b2",
		category: "📸 스드메 (스/드/메)",
		targetAmount: 5250000,
		actualAmount: 3800000,
		percentage: 15,
		aiAdvice:
		"토탈 샵 패키지로 기본금을 낮췄으나, 스튜디오 원본 수령비(33만) 및 헬퍼비 추가금을 예산에 반영해 두어야 합니다.",
	},
	{
		id: "b3",
		category: "💍 예물 & 반지",
		targetAmount: 5250000,
		actualAmount: 4800000,
		percentage: 15,
		aiAdvice:
		"청담동 디자이너 샵 자체 제작으로 목표 예산 대비 45만 원을 절약하셨습니다!",
	},
	{
		id: "b4",
		category: "✈️ 신혼여행",
		targetAmount: 5250000,
		actualAmount: 0,
		percentage: 15,
		aiAdvice:
		"출발 6개월 전 항공권을 사전 결제하면 비즈니스 승급 이벤트를 노려볼 수 있습니다.",
	},
	{
		id: "b5",
		category: "🎁 예비비 & 기타",
		targetAmount: 3500000,
		actualAmount: 500000,
		percentage: 10,
		aiAdvice:
		"본식 당일 수발비 및 도우미 현금 지급용으로 최소 100만 원은 현금 보유를 권장합니다.",
	},
];

export const MOCK_VENDORS: Vendor[] = [
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
		name: "반조에 청담 (예물)",
		category: "예물",
		rating: 4.9,
		address: "서울 강남구 삼성로 149길",
		priceTag: "웨딩밴드 커플링 300만 원대",
		lat: 37.5195,
		lng: 127.0512,
	},
];
