import { create } from 'zustand';
import { ModalState } from '@/types/storeType';

/**
 * Zustand store for managing modal state.
 * Provides state variables and actions to open and close the modal with specific content.
 * @interface ModalState
 * @property {boolean} isOpen - Indicates if the modal is open.
 * @property {string | null} type - The type of the modal.
 * @property {(content: string) => void} openModal - Function to open the modal with specified content.

 * @property {() => void} closeModal - Function to close the modal.
 */

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  fileId: null,
  fileName: null,
  openModal: (type, fileId, fileName) => {
    set({
      isOpen: true,
      type,
      fileId,
      fileName,
    });
  },
  closeModal: () => {
    set({ isOpen: false, type: null, fileId: null, fileName: null });
  },
}));

export default useModalStore;
