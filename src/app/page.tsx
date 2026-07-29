'use client';
import Timeline from "@/components/Timeline";
import Loading from "./Loading";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";

export default function Home() {
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
				<Onboarding />
				<Timeline />
			</div>
		);
}
