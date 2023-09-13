import { create } from "zustand";

interface usePorModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<usePorModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
