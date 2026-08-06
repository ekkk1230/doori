import { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModalType = "check" | "confirm";

interface UiStoreState {
    isOnboarded: boolean;
    isOpenModal: boolean;
	isLoading: boolean;
    
    modalType: ModalType;
    modalTarget: ReactNode | null;

    setIsOnboarded: (status: boolean) => void
    openModal: (target: ReactNode, type?: ModalType) => void;
    closeModal: () => void;
	setLoading: (isLoading: boolean) => void;
}

export const useUiStore = create<UiStoreState>()(
    persist(
		(set) => ({
			isOnboarded: false, 
			isOpenModal: false,
			isLoading: false,

			modalType: "confirm",
			modalTarget: null,

			setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
			openModal: (target, type = "confirm") => set({ 
				isOpenModal: true,
				modalTarget: target,
				modalType: type,
			}),
			closeModal: () => set({ 
				isOpenModal: false,
				modalTarget: null,
				modalType: "confirm",
			}),
			setLoading: (isLoading) => set({ isLoading }),
		}),
		{
			name: "doori-ui-storage",
			partialize: state => ({ isOnboarded: state.isOnboarded }),
		}
    )
);