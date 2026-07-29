'use client';
import Timeline from "@/components/Timeline";
import Loading from "./Loading";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";
import { useUiStore } from "@/store/useUiStore";
import PlanTab from "@/components/PlanTab";

export default function Home() {
	const { activeTab } = useUiStore();

	const [showSplash, setShowSplash] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);

	return (
			<div>
				{showSplash && (
					<SplashScreen
						isLoadingData={isLoadingData}
						onFinish={() => setShowSplash(false)}
					/>
				)}
				{!showSplash && (
					<>
						{ activeTab === "onboarding" && <Onboarding /> }
						{ activeTab === "planTab" && <PlanTab /> }
					</>
				)}
				{/* <Timeline /> */}
			</div>
		);
}
