import {
	UserInput,
	ContractAnalysisResult,
	BudgetItem,
	ChecklistItem,
	Vendor,
} from "@/types/doori";

// 1. 유저 초기 설정 예시
export const MOCK_USER_INPUT: UserInput = {
	weddingDate: "2027-04-24",
	periodMonths: 8,
	budgetTier: "표준",
	totalBudget: 35000000,
	location: "서울 강남구",
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

// 4. [12개월 정석 베이스 + 단기 플랜 스킵/대안 포함] 타임라인 체크리스트
export const MOCK_TIMELINE_ITEMS: ChecklistItem[] = [
	// ── [1단계: 기획 & 웨딩홀] ──
	{
		id: "t1",
		dDay12m: "D-360",
		title: "양가 부모님 공식 인사 & 상견례",
		category: "기획",
		completed: true,
		aiTip: "양가 중간 지점의 정갈한 룸 형태 한정식집을 추천합니다.",
	},
	{
		id: "t2",
		dDay12m: "D-330",
		title: "총예산 수립 & 희망 예식 지역/보증인원 설정",
		category: "기획",
		completed: true,
		aiTip: "신랑/신부/부모님 간 예산 분담 비율을 가장 먼저 명확히 정하세요.",
	},
	{
		id: "t3",
		dDay12m: "D-300",
		title: "웨딩홀 투어 및 최종 계약 (골든타임/잔여타임 선점)",
		category: "웨딩홀",
		completed: true,
		aiTip: "인기홀 골든타임(토요일 12~2시)은 1년 전에 오픈되자마자 마감됩니다.",
		shortPlanNote:
		"4개월 이하 단기 플랜은 잔여 타임 특가 할인을 적극 노려보세요.",
	},

	// ── [2단계: 스드메 & 촬영] ──
	{
		id: "t4",
		dDay12m: "D-270",
		title: "스드메 (스튜디오/드레스/메이크업) 계약",
		category: "스드메",
		completed: false,
		aiTip: "플래너 지정 및 인기 메이크업 부원장급 예약은 일찍 마감됩니다.",
	},
	{
		id: "t5",
		dDay12m: "D-250",
		title: "드레스 샵 투어 (2~3곳 비교 피팅 및 최종 샵 결정)",
		category: "스드메",
		completed: false,
		skipIfUnderMonths: 6, // 4개월/3개월 단기 플랜에서는 피팅 투어 생략!
		aiTip: "드레스 샵 투어 피팅비(각 5만 원)는 현금 봉투로 준비해 가세요.",
		shortPlanNote:
		'단기 플랜은 투어를 생략하고 한 곳에서 해결하는 "토탈 샵" 패키지를 추천합니다.',
	},
	{
		id: "t6",
		dDay12m: "D-240",
		title: "본식 스냅 & DVD 영상 작가 예약",
		category: "웨딩홀",
		completed: false,
		skipIfUnderMonths: 4, // 3개월 플랜에서는 아이폰 스냅/기본 스냅으로 대체
		aiTip: "유명 1인/2인 스냅 작가는 웨딩홀만큼 예약이 빨리 마감됩니다.",
	},
	{
		id: "t7",
		dDay12m: "D-210",
		title: "신혼여행지 확정 및 항공권/숙소 예약",
		category: "신혼집여행",
		completed: false,
		aiTip:
		"유럽, 하와이 등 장거리 휴양지는 7~8개월 전에 예매해야 특가를 잡습니다.",
		shortPlanNote:
		"3~4개월 단기 플랜은 무비자 휴양지(발리, 괌 등) 위주로 빠르게 결정하세요.",
	},

	// ── [3단계: 예물/예복 & 스튜디오] ──
	{
		id: "t8",
		dDay12m: "D-180",
		title: "웨딩 밴드(예물) 수제 맞춤 & 신랑 정장 비스포크 맞춤",
		category: "예물예복",
		completed: false,
		aiTip:
		"청담/백화점 커플링 수제 제작 및 예복 맞춤은 최소 2~3개월 소요됩니다.",
		shortPlanNote:
		"단기 플랜은 백화점 기성 브랜드 반지 즉시 수령 & 예복 대여로 시간을 아끼세요.",
	},
	{
		id: "t9",
		dDay12m: "D-150",
		title: "촬영용 드레스 가가봉 & 신랑 예복 1차 피팅",
		category: "스드메",
		completed: false,
		skipIfUnderMonths: 6, // 단기 플랜은 촬영 당일 드레스 셀렉 후 바로 촬영
	},
	{
		id: "t10",
		dDay12m: "D-120",
		title: "스튜디오 웨딩 촬영 진행 📸",
		category: "스드메",
		completed: false,
		aiTip:
		"촬영 당일 원본/수정본 데이터 구매비(약 33만~44만 원)와 헬퍼비(20만 원) 현금을 챙기세요.",
	},

	// ── [4단계: 신혼집 & 청첩장] ──
	{
		id: "t11",
		dDay12m: "D-90",
		title: "신혼집 계약 확정 & 입주 가전/가구 비교",
		category: "신혼집여행",
		completed: false,
	},
	{
		id: "t12",
		dDay12m: "D-90",
		title: "종이 청첩장 샘플 신청 & 디자인 결정 및 인쇄",
		category: "본식준비",
		completed: false,
		skipIfUnderMonths: 4, // 3개월 플랜은 모바일 청첩장에 집중
	},
	{
		id: "t13",
		dDay12m: "D-60",
		title: "모바일 청첩장 제작 & 청첩장 모임 시작",
		category: "본식준비",
		completed: false,
	},
	{
		id: "t14",
		dDay12m: "D-60",
		title: "본식 사회자/축가 부탁 & 혼주 메이크업 예약",
		category: "본식준비",
		completed: false,
	},

	// ── [5단계: 최종 점검 & D-Day] ──
	{
		id: "t15",
		dDay12m: "D-45",
		title: "웨딩홀 시식 (양가 부모님 동행) & 혼주 한복 대여",
		category: "웨딩홀",
		completed: false,
		skipIfUnderMonths: 6, // 단기 플랜은 시식 생략 후 한복 대여에 집중
	},
	{
		id: "t16",
		dDay12m: "D-30",
		title: "본식 드레스 최종 셀렉 (본식 가가봉) & 부케 주문",
		category: "스드메",
		completed: false,
	},
	{
		id: "t17",
		dDay12m: "D-14",
		title: "웨딩홀 최종 보증인원 확정 & BGM/식순지 제출",
		category: "본식준비",
		completed: false,
	},
	{
		id: "t18",
		dDay12m: "D-7",
		title: "사회자/축가/도우미/헬퍼 수발비 현금 봉투 준비",
		category: "본식준비",
		completed: false,
		aiTip:
		"당일 카카오페이/현금인출이 어려울 수 있으니 현금 봉투를 완벽히 분류해 두세요!",
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
