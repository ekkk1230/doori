'use client';
import Timeline from "@/components/Timeline";
import Loading from "./Loading";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";
import { useUiStore } from "@/store/useUiStore";
import Plan from "@/components/Plan";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

export default function Home() {
	const { isOnboarded } = useUiStore();

	const [showSplash, setShowSplash] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
	
	return (
			<>
				{showSplash && (
					<SplashScreen
						isLoadingData={isLoadingData}
						onFinish={() => setShowSplash(false)}
					/>
				)}
				{!showSplash && (
					<>
						{!isOnboarded ? (
						/* 아직 온보딩 전이라면 */
						<Onboarding />
						) : (
						/* 온보딩 완료 시 메인 플랜 탭 노출 */
						<Plan />
						)}
					</>
				)}
				{/* <Timeline /> */}
			</>
		);
}
