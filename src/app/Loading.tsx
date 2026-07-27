export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
            <img src="/doori.svg" alt="Loading..." className="w-16 h-16 animate-bounce" />
            <p className="text-gray-500 text-[1.4rem] font-medium">로딩 중...</p>
            </div>
        </div>
    );
}