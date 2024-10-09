import { create } from 'zustand';
import { PopupState } from '@/types/storeType';

/**
 * Zustand store for managing popup state.
 * Provides state variables and actions to open and close the popup with specific content and position.
 * @interface PopupState
 * @property {boolean} isOpen - Indicates if the popup is open.
 * @property {string | null} content - The content to display in the popup.
 * @property {number} x - X coordinate for popup position.
 * @property {number} y - Y coordinate for popup position.
 * @property {(content: string, x: number, y: number) => void} openPopup - Function to open the popup with specified content and position.
 * @property {() => void} closePopup - Function to close the popup.
 */

const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  content: null,
  x: 0,
  y: 0,
  openPopup: (content: string, x: number, y: number) =>
    set({ isOpen: true, content, x, y }),
  closePopup: () => set({ isOpen: false, content: null, x: 0, y: 0 }),
}));

export default usePopupStore;
