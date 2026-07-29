# Doori (AI 기반 웨딩 플래너) - Claude Code Guide

## 1. Tech Stack
- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React

## 2. Key Commands
- `npm run dev`: 개발 서버 실행 (http://localhost:3000)
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사

## 3. Architecture & Domain Rules
- **Types**: 모든 도메인 관련 타입 인터페이스는 `src/types/doori.ts`에 일관되게 선언 및 내보내기 되어 있음.
- **Checklist Logic**:
  - 타임라인/체크리스트 구현 시 유저의 `periodMonths`와 아이템의 `skipIfUnderMonths` 조건을 비교하여 동적 필터링을 적용할 것.
  - 단기 플랜 시 `shortPlanNote` 문구가 있으면 우선적으로 보여줄 것.
- **Budget Logic**:
  - 목표 예산(`targetAmount`) 대비 실제 계약액(`actualAmount`) 차액을 기반으로 예산 게이지 및 상태를 계산할 것.

## 4. Coding Conventions
- **Component**: `src/components/` 하위에 작성하며 Client Component인 경우 상단에 `'use client';` 명시.
- **Imports**: 절대 경로 `@/` 사용 (`@/types/doori`, `@/components/` 등), 알파벳 순으로 정렬.
- **Styling**: inline style 자제, Tailwind CSS v4 클래스 위주 사용, 4칸 들여쓰기
- **Language**: UI 텍스트 및 주석, 에러 메시지는 모두 한국어(Korean)로 작성.