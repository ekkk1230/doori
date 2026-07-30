import { ChecklistItem } from "@/types/doori";

// [12개월 정석 베이스 + 단기 플랜 스킵/대안 포함] 타임라인 체크리스트
export const DEFAULT_WEDDING_TIMELINE: ChecklistItem[] = [
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
		aiTip: "촬영 당일 원본/수정본 데이터 구매비(약 33만~44만 원)와 헬퍼비(20만 원) 현금을 챙기세요.",
	},
    {
        id: "t10-1",
        dDay12m: "D-130",
        title: "촬영용 헤어 염색 & 헤어변형 작가 최종 체크",
        category: "스드메",
        completed: false,
        skipIfUnderMonths: 4,
        aiTip: "촬영 5~7일 전 톤다운 염색이 가장 사진에 고급스럽게 담깁니다.",
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
    {
        id: "t14-1",
        dDay12m: "D-45",
        title: "식전 영상 제작 & 본식 BGM/사회자 대본 작성",
        category: "본식준비",
        completed: false,
        aiTip: "청첩장 제작 시 무료로 제공되는 식전 영상 제작 쿠폰을 활용하세요.",
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
        id: "t17-1",
        dDay12m: "D-3",
        title: "웨딩 네일/패디 케어 & 웨딩 밴드 본식 상자 챙기기",
        category: "본식준비",
        completed: false,
        aiTip: "드레스 착용 후 음료를 마실 수 있도록 주름 빨대를 꼭 챙기세요!",
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
]