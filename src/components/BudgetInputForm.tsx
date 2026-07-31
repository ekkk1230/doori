"use client";

import { useDooriStore } from "@/store/useDooriStore";

export default function BudgetInputForm() {
    const { totalBudget } = useDooriStore();

    return (
        <div className="container">
            <div>
                <p>예산 대비 지출 현황</p>
                <div className="tit text-[1.8rem] text-[#777]">
                    <span className="text-[3rem] text-[#000]">0만 원</span> / {totalBudget}만 원
                </div>


            </div>
        </div>
    )
}
