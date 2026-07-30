"use client";
import { LayoutGrid, Wallet, CalendarDays, GitCompare, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "플랜", href: "/", icon: LayoutGrid },
        { name: "예산", href: "/budget", icon: Wallet },
        { name: "타임라인", href: "/timeline", icon: CalendarDays },
        { name: "비교", href: "/compare", icon: GitCompare },
        { name: "업체", href: "/vendors", icon: Building2 },
    ]

    return (
        <nav className="flex justify-between p-[1rem] w-full px-[10%] bg-white/50 backdrop-blur-[1rem] border-t-solid border-t-[.1rem] border-t-rose-100/60">
            {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                return (
                    <Link 
                        key={idx} href={item.href}
                        className={`flex flex-col ${isActive ? "text-rose-500 font-bold" : "text-gray-400 hover:text-gray-600 font-medium"}`}
                    >
                        <Icon className="w-[2.4rem] h-[2.4rem] mb-[.8rem] mx-auto" />
                        <p className="text-[1.2rem] fomt-semibold text-center">{item.name}</p>
                    </Link>
                )
            })}
        </nav>
    )
}
