"use client";

import { useUiStore } from "@/store/useUiStore";
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
    const { isOnboarded } = useUiStore();

    return (
        <div className="relative z-10 flex flex-col min-h-screen mx-auto bg-white/60 shadow-xl">
            {isOnboarded && <Header />}
            <main className="flex-1 w-full max-w-[140rem] mx-auto">{children}</main>
            {isOnboarded && <BottomNav />}
        </div>
    )
}
