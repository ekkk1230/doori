'use client';

import { MOCK_USER_INPUT } from "@/constants/mockData"
import { DEFAULT_WEDDING_TIMELINE } from "@/data/weddingChecklist";

import { ChecklistItem } from "@/types/doori";
import { calculateWeddingPeriod } from "@/utils/date";
import { useState } from "react"

export default function Timeline() {
    const [weddingDate, setWeddingDate] = useState<string>(MOCK_USER_INPUT.weddingDate);
    // console.log(weddingDate)
    const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_WEDDING_TIMELINE);

    const { periodMonths, dDayText } = calculateWeddingPeriod(weddingDate);

    const filteredItems = items.filter(item => {
        if (!item.skipIfUnderMonths) return true; // 필수항목 무조건 포함
        return periodMonths >= item.skipIfUnderMonths; // 기간 부족 시 스킵
    });

    const toggleComplete = (id: string) => {
        setItems(prev => 
            prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
        );
    };

    const completedCount = filteredItems.filter(i => i.completed).length;

    return (
        <div className="mt-[1rem] glass-card p-[2.4rem_2rem]">
            <p className="tit">진행률</p>
            <div className="flex items-center">
                <span className="font-bold text-[3rem]">0</span>
                <sub className="text-[1.8rem] ml-[.4rem] text-[#e9e8c9]">%</sub>
            </div>
        </div>
    )
}
