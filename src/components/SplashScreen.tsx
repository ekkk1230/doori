'use client'

import { useEffect, useState } from "react";

interface SplashScreenProps {
    isLoadingData: boolean;
    onFinish: () => void;
}

export default function SplashScreen({ isLoadingData, onFinish }: SplashScreenProps) {
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // 최소 1.5초 노출 보장
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 최소시간 후 + 데이터 로딩 완료되면 종료
    useEffect(() => {
        if (minTimePassed && !isLoadingData) { 
            setIsFadingOut(false);

            const finishTimer = setTimeout(() => {
                onFinish();
            }, 500);

            return () => clearTimeout(finishTimer);
        }
    }, [minTimePassed, isLoadingData, onFinish]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-50 transition-opacity duration-500 ${
                isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* 로고 / 타이틀 */}
            <div className="flex flex-col items-center gap-[1.2rem] animate-bounce">
                <div>
                    <img src="/doori.svg" alt="" />
                    <h1 className="tit text-center mt-[1rem] text-3xl font-extrabold text-gray-800 tracking-tight">
                        doori
                    </h1>
                </div>
            </div>

            {/* 메인 카피 */}
            <p className="mt-4 text-[1.8rem] font-medium text-gray-500">
                AI와 함께하는 스마트한 결혼 준비
            </p>

            {/* 인디케이터 (로딩 중일 때) */}
            {/* <div className="mt-8 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-ping" />
                <span className="text-xs text-rose-500 font-semibold">
                    플랜 준비 중...
                </span>
            </div> */}
        </div>
    )
}
