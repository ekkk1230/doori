import { useUiStore } from '@/store/useUiStore';
import { RefreshCw } from "lucide-react";

export default function Header() {
    const { setIsOnboarded } = useUiStore();
    
    return (
        <header className="sticky top-0 z-50 w-full border-b border-rose-100/60 bg-white/70 backdrop-blur-md">
            <div className="mx-auto flex items-center justify-between p-[1.6rem_2.4rem]">
                <div 
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => setIsOnboarded(true)}
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-400 text-white shadow-sm">
                        <img src="/doori.svg" alt="" />
                    </div>
                    <span className="tit text-[1.8rem] font-bold tracking-tight text-gray-800">
                        doori 
                    </span>
                </div>

                {/* 우측 버튼 (온보딩 재진입) */}
                <button
                    type="button"
                    onClick={() => setIsOnboarded(false)}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-1.5 text-[1.3rem] font-medium text-rose-500 transition-colors hover:bg-rose-100/60"
                >
                    <RefreshCw className="h-3.5 w-3.5" />
                    새 플랜
                </button>
            </div>
        </header>
    );
}
