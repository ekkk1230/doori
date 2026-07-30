// 1. 유저 입력 조건 (초기 설정용)
export interface UserInput {
    weddingDate: string;        // 예: '2027-04-24'
    periodMonths: number;       // 계산된 준비 기간 (예: 12, 8, 6, 4, 3)
    budgetTier: '가성비' | '표준' | '초호화';
    totalBudget: number;        // 예: 35000000
    location: string;           // 예: '서울 강남구'
    guestCount: number;
  }
  
  // 2. 유저가 실제 상담/계약 후 입력하는 견적 타입
  export interface UserContractInput {
    category: '웨딩홀' | '스드메' | '예물/예복' | '기타';
    vendorName: string;         // 상담/계약한 업체명 (예: A 웨딩홀)
    location: string;           // 지역구 (예: 서울 강남구)
    contractAmount: number;     // 실제 견적/계약 금액 (예: 18000000)
    details?: string;           // 메모 (보증인원, 추가금 등)
  }
  
  // 3. AI가 타 업체와 비교 분석해 준 결과 타입
  export interface ContractAnalysisResult {
    userInput: UserContractInput;
    regionalAverage: number;    // 해당 지역구 동일 카테고리 평균 금액
    priceEvaluation: '혜자 (아주 잘함)' | '적정 (평균 수준)' | '주의 (거품 있음)';
    diffAmount: number;         // 평균 대비 차액 (+: 초과, -: 절감)
    comparedVendors: string[];  // 비교 대상 타 업체들
    aiDiagnosis: string;        // 페르소나의 총평 및 피드백
  }
  
  // 4. 예산 항목 타입
  export interface BudgetItem {
    id: string;
    category: string;
    targetAmount: number;
    actualAmount: number;
    percentage: number;
    aiAdvice: string;
  }
  
  // 5. 12개월 정석 베이스 + 단기 플랜 대응 체크리스트 타입
  export interface ChecklistItem {
    id: string;
    stage?: string;             // 추가: "1단계: 기획 & 웨딩홀" 등의 그룹명
    dDay12m: string;            // 12개월 정석 기준 D-Day (예: 'D-360', 'D-270')
    title: string;              // 작업 명칭 (예: '드레스 샵 투어')
    description?: string;       // 일정에 대한 기본 설명 및 가이드
    category: '기획' | '웨딩홀' | '스드메' | '예물예복' | '신혼집여행' | '본식준비';
    isEssential?: boolean;      // 추가: 필수 체크 항목 여부 (기본값 false 또는 true)
    completed: boolean;         // 체크 여부
    aiTip?: string;             // 플래너의 기본 팁
    
    // 정석에서 기간별로 줄이기 위한 옵션 필드
    skipIfUnderMonths?: number; // 이 개월 수 미만 플랜에서는 자동 생략
    shortPlanNote?: string;     // 단기 플랜 시 보여줄 AI의 대안 가이드
  }
  
  // 6. 카카오맵 주변 업체 타입
  export interface Vendor {
    id: string;
    name: string;
    category: '웨딩홀' | '스드메' | '예물' | '기타';
    rating: number;
    address: string;
    priceTag: string;
    lat: number;
    lng: number;
  }