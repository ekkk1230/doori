"use client";

import { useUiStore } from '@/store/useUiStore'

export default function ModalLayer() {
    const { isOpenModal, modalTarget, closeModal } = useUiStore();

    if (!isOpenModal) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-[2rem]">

            <div className="absolute inset-0" onClick={closeModal} />

            {/* 모달 박스 */}
            <div className="relative z-10 w-full max-w-[50rem] rounded-[1.6rem] bg-white p-[2.4rem] shadow-xl max-h-[90vh] overflow-y-auto">
                { modalTarget }
            </div>
        </div>
    )
}
