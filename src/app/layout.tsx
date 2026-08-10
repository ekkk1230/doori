import type { Metadata } from 'next';
import "./globals.css";
import ClientLayoutShell from "@/components/ClientLayoutShell";
import ModalLayer from '@/components/modal/ModalLayer';
import Script from 'next/script';

export const metadata: Metadata = {
	title: "doori | AI 웨딩 플래너",
	description: "스마트한 AI 웨딩 시세 분석 및 예산 비교 서비스"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const KAKAO_KEY = process.env.KAKAO_JAVASCRIPT_KEY;
	return (
		<html lang="ko">
			<head>
				<Script 
					src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`}
					strategy="beforeInteractive"
				/>
			</head>
			<body className="relative min-h-screen bg-rose-50/30 overflow-x-hidden antialiased">
				<div
					className="pointer-events-none fixed inset-0 overflow-hidden z-0"
					aria-hidden="true"
				>
					<div className="absolute -right-24 -top-24 h-100 w-100 rounded-full bg-yellow-200/50 blur-3xl" />
					<div className="absolute -left-24 top-1/3 h-100 w-100 rounded-full bg-purple-200/90 blur-3xl" />
					<div className="absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-rose-200/90 blur-3xl" />
				</div>

				<ClientLayoutShell>{children}</ClientLayoutShell>

				<ModalLayer />
			</body>
		</html>
	);
}
