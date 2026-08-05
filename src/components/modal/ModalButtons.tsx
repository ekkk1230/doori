import { useUiStore } from "@/store/useUiStore";

interface ModalButtonsProps {
    onConfirm?: () => void;
}

export default function ModalButtons({ onConfirm }: ModalButtonsProps) {
    const { modalType, closeModal } = useUiStore();

    const handleConfirmClick = () => {
        console.log(onConfirm)
        if (onConfirm) onConfirm();

        closeModal();
    }

    return (
         <div className="modal-buttons">
            {modalType === "confirm" && (
                <button onClick={closeModal}>취소</button>
            )}
            <button onClick={handleConfirmClick}>확인</button>
        </div>
    )
}
