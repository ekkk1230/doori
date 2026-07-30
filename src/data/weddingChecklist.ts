import { Checklist } from "@/types/doori";

export const DEFAULT_WEDDING_TIMELINE: Checklist.Item[] = [
    // ── [1단계: 기획 & 웨딩홀] ──
    {
        id: "t1",
        stage: "1단계: 기획 & 웨딩홀",
        dDay12m: "D-360",
        title: "양가 부모님 공식 인사 & 상견례",
        description: "양가 집안이 공식적으로 만나 정식 인사를 나누고 예식 기본 일정을 논의하는 첫 공식 자리입니다.",
        category: "기획",
        isEssential: true,
        completed: true,
        plannerTip: "양가 중간 지점의 정갈한 룸 형태 한정식집을 추천하며, 조용한 분위기 유지를 위해 사전에 코스 요리로 예약하세요.",
        shortPlanNote: "단기 플랜은 상견례 날짜를 주말 점심으로 빠르게 고정하고 예식 날짜 논의를 최우선으로 진행하세요."
    },
    {
        id: "t2",
        stage: "1단계: 기획 & 웨딩홀",
        dDay12m: "D-330",
        title: "총예산 수립 & 희망 예식 지역/보증인원 설정",
        description: "전체 예산 범위를 설정하고 예식 희망 지역과 예상 하객(보증인원) 수의 기준을 잡습니다.",
        category: "기획",
        isEssential: true,
        completed: true,
        plannerTip: "신랑/신부/부모님 간 예산 분담 비율을 가장 먼저 명확히 정하고, 비상금 예산 10%를 별도로 측정해두세요.",
        shortPlanNote: "단기 플랜은 예산 범위를 조율할 시간이 부족하므로 결정권자(양가 부모님)와 상의해 상한선을 즉시 확정하세요."
    },
    {
        id: "t3",
        stage: "1단계: 기획 & 웨딩홀",
        dDay12m: "D-300",
        title: "웨딩홀 투어 및 최종 계약 (골든타임/잔여타임 선점)",
        description: "원하는 분위기의 웨딩홀 2~3곳을 투어하며 식대, 홀 대관료, 동선을 비교 후 계약을 체결합니다.",
        category: "웨딩홀",
        isEssential: true, 
        completed: true,
        plannerTip: "인기홀 골든타임(토요일 12~2시)은 1년 전에 오픈되자마자 마감됩니다.",
        shortPlanNote: "4개월 이하 단기 플랜은 원하는 날짜를 고집하기보다 웨딩홀의 잔여 타임 특가 할인을 적극 노려보세요."
    },

    // ── [2단계: 스드메 & 촬영] ──
    {
        id: "t4",
        stage: "2단계: 스드메 & 촬영",
        dDay12m: "D-270",
        title: "스드메 (스튜디오/드레스/메이크업) 계약",
        description: "웨딩 컨설팅 업체나 비동행/동행 플래너를 선정하고 전체적인 스드메 업체 스타일을 결정합니다.",
        category: "스드메",
        isEssential: true,
        completed: false,
        plannerTip: "플래너 지정 및 인기 메이크업 부원장급 예약은 빠르게 마감되니 인스타그램 포트폴리오를 미리 확인해보세요.",
        shortPlanNote: "단기 플랜은 스드메를 각각 알아보지 말고, 플래너의 즉시 예약 가능한 패키지 묶음 상품으로 계약하세요."
    },
    {
        id: "t5",
        stage: "2단계: 스드메 & 촬영",
        dDay12m: "D-250",
        title: "드레스 샵 투어 (2~3곳 비교 피팅 및 최종 샵 결정)",
        description: "마음에 드는 드레스 샵 2~3곳을 방문해 체형과 이미지에 맞는 샵을 최종 지정합니다.",
        category: "스드메",
        isEssential: true,
        completed: false,
        skipIfUnderMonths: 6,
        plannerTip: "드레스 샵 투어 피팅비(각 5만 원)는 현금 봉투로 준비해 가세요.",
        shortPlanNote: '단기 플랜은 여러 샵 투어를 생략하고 한 곳에서 피팅 및 셀렉을 끝내는 "토탈 샵" 패키지를 추천합니다.'
    },
    {
        id: "t6",
        stage: "2단계: 스드메 & 촬영",
        dDay12m: "D-240",
        title: "본식 스냅 & DVD 영상 작가 예약",
        description: "웨딩홀 계약 내용(연계 스냅 포함 여부)을 확인하고, 필요한 경우 전담 스냅/DVD 작가를 섭외합니다.",
        category: "웨딩홀",
        isEssential: true, 
        completed: false,
        skipIfUnderMonths: 4,
        plannerTip: "유명 1인/2인 스냅 작가는 웨딩홀만큼 예약이 빨리 마감됩니다.",
        shortPlanNote: "단기 플랜은 개인 작가보다는 팀 단위로 운영되는 유명 스냅 업체의 잔여 일정 가능 작가를 문의하세요."
    },
    {
        id: "t7",
        stage: "2단계: 스드메 & 촬영",
        dDay12m: "D-210",
        title: "신혼여행지 확정 및 항공권/숙소 예약",
        description: "휴양 및 관광 스타일, 일정 및 예산에 맞는 여행지를 확정하고 항공권과 리조트를 예약합니다.",
        category: "신혼집여행",
        isEssential: true,
        completed: false,
        plannerTip: "유럽, 하와이 등 장거리 휴양지는 7~8개월 전에 예매해야 특가를 잡습니다.",
        shortPlanNote: "3~4개월 단기 플랜은 비자 발급이 필요 없거나 빠른 무비자 휴양지(발리, 괌, 푸켓 등) 위주로 확정하세요."
    },

    // ── [3단계: 예물/예복 & 스튜디오] ──
    {
        id: "t8",
        stage: "3단계: 예물/예복 & 스튜디오",
        dDay12m: "D-180",
        title: "웨딩 밴드(예물) 수제 맞춤 & 신랑 정장 비스포크 맞춤",
        description: "평생 착용할 웨딩 커플링 제작을 의뢰하고, 신랑 촬영 및 본식용 맞춤 정장을 채촌(치수 측정)합니다.",
        category: "예물예복",
        isEssential: true, 
        completed: false,
        plannerTip: "청담/백화점 커플링 수제 제작 및 예복 맞춤은 제작부터 수령까지 최소 2~3개월 소요됩니다.",
        shortPlanNote: "단기 플랜은 백화점 기성 브랜드 반지 즉시 수령 및 예복 대여(대여복 수선)로 시간을 아끼세요."
    },
    {
        id: "t9",
        stage: "3단계: 예물/예복 & 스튜디오",
        dDay12m: "D-150",
        title: "촬영용 드레스 가가봉 & 신랑 예복 1차 피팅",
        description: "스튜디오 웨딩 촬영에 입을 드레스 3~4벌을 선택하고 신랑 맞춤 예복의 가가봉 가공 상태를 점검합니다.",
        category: "스드메",
        isEssential: false, 
        completed: false,
        skipIfUnderMonths: 6,
        plannerTip: "드레스 셀렉 시 슬림, 풍성, 색상 드레스의 조합을 다양하게 구성해야 스튜디오 사진 컨셉이 다채로워집니다.",
        shortPlanNote: "단기 플랜은 스튜디오 촬영 당일 샵에서 직접 드레스를 고르는 '당일 현장 셀렉' 방식을 활용하세요."
    },
    {
        id: "t10",
        stage: "3단계: 예물/예복 & 스튜디오",
        dDay12m: "D-130",
        title: "촬영용 헤어 염색 & 헤어변형 작가 최종 체크",
        description: "사진에 머리 결이 잘 살아나도록 헤어 컬러를 정리하고, 촬영 당일 헤어변형 출장 일정을 재확인합니다.",
        category: "스드메",
        isEssential: false, 
        completed: false,
        skipIfUnderMonths: 4,
        plannerTip: "촬영 5~7일 전 톤다운 염색(초코브라운 계열)이 사진에 가장 입체적이고 고급스럽게 담깁니다.",
        shortPlanNote: "단기 플랜은 출장 헤어변형 작가 섭외가 어려울 수 있으니 스튜디오 헬퍼 이모님의 헤어변형 가능 여부를 체크하세요."
    },
    {
        id: "t11",
        stage: "3단계: 예물/예복 & 스튜디오",
        dDay12m: "D-120",
        title: "스튜디오 웨딩 촬영 진행 📸",
        description: "드레스, 예복, 소품, 간식 등을 준비하여 리허설 스튜디오 웨딩 촬영을 진행합니다.",
        category: "스드메",
        isEssential: true,
        completed: false,
        plannerTip: "촬영 당일 원본/수정본 데이터 구매비(약 33만~44만 원)와 헬퍼비(20만 원) 현금을 챙기세요.",
        shortPlanNote: "단기 플랜은 모바일 청첩장 제작용 '긴급 보정본(모청용 5장)'을 일찍 받을 수 있는지 스튜디오에 사전 요청하세요."
    },

    // ── [4단계: 신혼집 & 청첩장] ──
    {
        id: "t12",
        stage: "4단계: 신혼집 & 청첩장",
        dDay12m: "D-90",
        title: "신혼집 계약 확정 & 입주 가전/가구 비교",
        description: "신혼집 매매/전세 계약을 마무리하고 필요한 대형 가전과 가구를 비교 구매(오픈점 특가 등)합니다.",
        category: "신혼집여행",
        isEssential: true,
        completed: false,
        plannerTip: "가전은 여러 매장 견적 비교 후 '백화점 오픈점'이나 '다품목 묶음 할인'을 노리는 것이 가장 저렴합니다.",
        shortPlanNote: "단기 플랜은 수제 가구나 해외 배송 가전을 피하고 즉시 입고/배송이 가능한 브랜드 가전·가구를 선택하세요."
    },
    {
        id: "t13",
        stage: "4단계: 신혼집 & 청첩장",
        dDay12m: "D-90",
        title: "종이 청첩장 샘플 신청 & 디자인 결정 및 인쇄",
        description: "여러 업체에서 청첩장 샘플을 받아 재질과 디자인을 비교한 뒤 문구를 작성하여 인쇄를 진행합니다.",
        category: "본식준비",
        isEssential: true, 
        completed: false,
        skipIfUnderMonths: 4,
        plannerTip: "예상 하객 수보다 50~100장 정도 여유 있게 인쇄하세요. 추후 추가 인쇄 시 단가가 2배 이상 올라갑니다.",
        shortPlanNote: "4개월 이하 단기 플랜은 종이 청첩장은 최소 수량만 초스피드 초안으로 제작하고 모바일 청첩장을 메인으로 활용하세요."
    },
    {
        id: "t14",
        stage: "4단계: 신혼집 & 청첩장",
        dDay12m: "D-60",
        title: "모바일 청첩장 제작 & 청첩장 모임 시작",
        description: "수정본 사진으로 모바일 청첩장을 완성하고 지인, 친척, 직장 동료들에게 모임을 가지며 소식을 알립니다.",
        category: "본식준비",
        isEssential: true, 
        completed: false,
        plannerTip: "예식 1~2달 전부터 모임을 시작해야 피로도를 줄일 수 있으며, 참석률을 높이기 위해 구글 캘린더 일정을 함께 공유해보세요.",
        shortPlanNote: "단기 플랜은 1:1 식사 모임이 어렵다면 소그룹 모임으로 모아서 청첩장 모임을 빠르게 완료하세요."
    },
    {
        id: "t15",
        stage: "4단계: 신혼집 & 청첩장",
        dDay12m: "D-60",
        title: "본식 사회자/축가 부탁 & 혼주 메이크업 예약",
        description: "본식을 매끄럽게 이끌어 줄 사회자와 축가자에게 부탁하고, 양가 부모님 및 친척 메이크업 샵을 예약합니다.",
        category: "본식준비",
        isEssential: true,
        completed: false,
        plannerTip: "부모님 혼주 메이크업은 웨딩홀 내부 샵으로 예약해 드려야 동선이 꼬이지 않고 부모님이 편안해하십니다.",
        shortPlanNote: "단기 플랜은 지인 사회자가 부담스러울 수 있으므로 전문 아나운서 사회자 업체를 섭외하는 것이 안전합니다."
    },
    {
        id: "t16",
        stage: "4단계: 신혼집 & 청첩장",
        dDay12m: "D-45",
        title: "식전 영상 제작 & 본식 BGM/사회자 대본 작성",
        description: "웨딩홀 상영용 식전 영상을 제작하고 입장/퇴장 BGM과 사회자 성혼선언문, 대본을 정리합니다.",
        category: "본식준비",
        isEssential: false, 
        completed: false,
        plannerTip: "종이 청첩장 제작 업체에서 무료로 제공하는 식전 영상 제작 쿠폰을 알차게 활용하세요.",
        shortPlanNote: "단기 플랜은 사진 20~30장만 넣으면 자동 완성되는 템플릿형 모바일 식전 영상을 이용해 10분 만에 제작하세요."
    },

    // ── [5단계: 최종 점검 & D-Day] ──
    {
        id: "t17",
        stage: "5단계: 최종 점검 & D-Day",
        dDay12m: "D-45",
        title: "웨딩홀 시식 (양가 부모님 동행) & 혼주 한복/정장 대여",
        description: "양가 부모님과 웨딩홀 뷔페/코스 요리를 직접 시식하고, 당일 입으실 혼주 한복과 정장을 대여하거나 맞춥니다.",
        category: "웨딩홀",
        isEssential: true, 
        completed: false,
        skipIfUnderMonths: 6,
        plannerTip: "시식은 주말 첫 타임 예식 시간대에 방문해야 실제 하객들에게 제공되는 음식 퀄리티를 정확히 확인할 수 있습니다.",
        shortPlanNote: "단기 플랜은 시식과 혼주 한복 대여를 같은 주말 하루에 동선상 몰아서 한 번에 끝내세요."
    },
    {
        id: "t18",
        stage: "5단계: 최종 점검 & D-Day",
        dDay12m: "D-30",
        title: "본식 드레스 최종 셀렉 (본식 가가봉) & 부케 주문",
        description: "본식날 입을 드레스를 최종 선택 및 가가봉하고, 드레스와 홀 분위기에 어울리는 부케 세트를 구성합니다.",
        category: "스드메",
        isEssential: true, 
        completed: false,
        plannerTip: "부케는 웨딩홀 조명과 드레스 색상(순백/아이보리/비즈 등)을 고려해 대비되는 컬러로 정해야 사진에 잘 찍힙니다.",
        shortPlanNote: "단기 플랜은 본식 드레스 최종 셀렉 날 바로 턱시도와 부케 주문까지 그 자리에서 결정을 완료하세요."
    },
    {
        id: "t19",
        stage: "5단계: 최종 점검 & D-Day",
        dDay12m: "D-14",
        title: "웨딩홀 최종 보증인원 확정 & BGM/식순지 제출",
        description: "최종 오실 하객 수를 체크하여 예식장에 보증인원을 연동 확정하고, 음원 파일과 대본을 전달합니다.",
        category: "본식준비",
        isEssential: true,
        completed: false,
        plannerTip: "보증인원은 확정 후 하향 조정이 불가능하므로, 예상 참석 인원의 85~90% 수준으로 안전하게 설정하세요.",
        shortPlanNote: "단기 플랜은 모바일 청첩장의 RSVP(참석 여부 전달) 기능을 적극 활용해 보증인원을 빠르게 집계하세요."
    },
    {
        id: "t20",
        stage: "5단계: 최종 점검 & D-Day",
        dDay12m: "D-3",
        title: "웨딩 네일/패디 케어 & 웨딩 밴드 본식 상자 챙기기",
        description: "반지 교환식과 손에 집중되는 사진 촬영을 위한 네일 케어를 진행하고 준비물(웨딩밴드 등)을 최종 수거합니다.",
        category: "본식준비",
        isEssential: true, 
        completed: false,
        plannerTip: "본식 드레스 착용 후에는 음료를 마시기 힘들므로 입술이 트지 않도록 긴 주름 빨대를 꼭 준비해두세요!",
        shortPlanNote: "단기 플랜은 젤 네일 샵 예약이 어려울 경우 붙이는 고퀄리티 젤 네일 팁 제품을 활용하면 5분 만에 해결됩니다."
    },
    {
        id: "t21",
        stage: "5단계: 최종 점검 & D-Day",
        dDay12m: "D-1",
        title: "사회자/축가/도우미/헬퍼 수발비 현금 봉투 준비",
        description: "당일 수고해주실 헬퍼 이모님, 사회자, 축가, 도우미 분들께 드릴 수발비를 봉투에 적절히 분류해 준비합니다.",
        category: "본식준비",
        isEssential: true,
        completed: false,
        plannerTip: "당일 카카오페이/현금인출이 어려울 수 있으니 예식 전날 봉투 겉면에 이름을 적어 완벽히 분류해 두세요!",
        shortPlanNote: "단기 플랜도 예식 전날 현금 준비는 필수입니다. 가방순이나 친한 친구 한 명에게 현금 봉투 전달을 미리 부탁하세요."
    },
];