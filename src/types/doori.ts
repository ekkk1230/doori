// 1. 예산 & 견적 & AI 분석 리포트 관련 타입
export namespace Budget {
	// 유저 초기 입력 조건
	export interface UserInput {
		weddingDate: string;        // 예: '2027-04-24'
		periodMonths: number;       // 준비 기간 (예: 12, 8, 6)
		budgetTier: '가성비' | '표준' | '초호화';
		totalBudget: number;        // 총예산 (예: 35000000)
		location: string;           // 예: '서울 강남구'
		guestCount: number;
	}

	// 유저 실제 상담/계약 입력 견적
	export interface ContractInput {
		category: '웨딩홀' | '스드메' | '예물/예복' | '기타';
		vendorName: string;         // 업체명 (예: A 웨딩홀)
		location: string;           // 지역구 (예: 서울 강남구)
		contractAmount: number;     // 실제 계약 금액 (단위: 만 원, 예: 1800 -> 1,800만 원)
		details?: string;           // 메모 (보증인원, 추가금 등)
	}

	// 예산 항목 카드용 타입
	export interface Item {
		id: string;
		category: '웨딩홀' | '스드메' | '예물/반지' | '신혼여행' | '기타';
		categoryRatio: number;       // 권장 비중 (%)
		standardRangeText: string;   // 표준 가이드 (예: "1,500~2,500만 원")
		targetAmount: number;        // 목표 예산
		actualAmount: number | null; // 실제 지출 금액
		aiAdvice: string;            // 항목별 AI 꿀팁
	}

	// 종합 AI 견적 분석 리포트
	export interface ComparisonReport {
		location: string;
		weddingMonth: number;
		userTotalSpent: number;
		marketAverageTotal: number;
		savedAmount: number;
		savedPercent: number;
		evaluationBadge: '최저 (아주 잘함)' | '적정 (평균)' | '주의 (초과)';
		comparedVendors: string[];
		itemAnalyses: {
			category: string;
			targetAmount: number;
			actualAmount: number;
			diffAmount: number;
			aiTip: string;
		}[];
		overallDiagnosis: string;
	}

	// AI 꿀팁 판정용 Context 타입
	export interface TipContext {
		amount: number;       // 현재 입력 금액
		target: number;       // 목표 금액
		totalBudget: number;  // 전체 총예산
		totalSpent: number;   // 전체 지출 합계
		tier?: 'value' | 'standard' | 'highend';
	}
}

// 2. 체크리스트 & 타임라인 관련 타입
export namespace Checklist {
	export interface Item {
		id: string;
		stage?: string;             // 예: "1단계: 기획 & 웨딩홀"
		dDay12m: string;            // 기준 D-Day (예: 'D-360')
		title: string;              // 작업 명칭 (예: '드레스 샵 투어')
		description?: string;
		category: '기획' | '웨딩홀' | '스드메' | '예물예복' | '신혼집여행' | '본식준비';
		isEssential?: boolean;      // 필수 체크 항목 여부
		completed: boolean;         // 완료 여부
		plannerTip: string;         // 플래너 기본 팁
		skipIfUnderMonths?: number; // 단기 플랜 시 자동 생략 개월 수
		shortPlanNote?: string;     // 단기 플랜 대안 가이드
	}
}

// 3. 업체 & 카카오맵 지도 관련 타입
export namespace Vendor {
	export interface Item {
		id: string;
		name: string;
		category: '웨딩홀' | '스드메' | '예물' | '기타';
		rating: number;
		address: string;
		priceTag: string;
		lat: number;
		lng: number;
	}
}

// 4. 시세 데이터 및 트렌드 관련 타입
export namespace Market {
	export interface Quarter {
		quarter: string;      // 분기
		season: string;       // 계절
		metroHall: string;    // 수도권 웨딩홀 평균
		localHall: string;    // 지방권역 웨딩홀 평균
		metroSdm: string;     // 수도권 스드메 평균
		localSdm: string;     // 지방권역 스드메 평균
		metroTotal: string;   // 수도권 총 평균
		localTotal: string;   // 지방 총 평균
	}

	export interface TrendData {
		id?: number | string;
		year: number;
		quarters: Quarter[];
		updatedAt: string;
		isFallback?: boolean;
	}

	export interface TableProps {
		data?: TrendData | null;
		selectedMonth?: number;
		isLoading?: boolean;
	}
}