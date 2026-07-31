"use client";

import { useDooriStore } from "@/store/useDooriStore";
import { Camera } from "lucide-react";

export default function Compare() {
    const { location, budgetTier } = useDooriStore();

    return (
        <div className="container">
            <div className="gradient-card rounded-[1.6rem] p-[2rem] w-full">
                <p className="text-white text-[1.6rem] flex items-center mb-[1rem] tit"><Camera className="mr-[.8rem] w-[2rem] h-[2rem]" />견적 비교 및 분석</p>
                <p className="tit text-[3rem] text-bold text-white">{location}·{budgetTier} 라인 실제 계약 분석 </p>
            </div>
            
            <p className="tit">실제 견적 VS 지역 평균 견적</p>
            <form action="">
                <label className="flex flex-col">
                    <span className="tit"></span>
                </label>
            </form>
        </div>
    )
}
