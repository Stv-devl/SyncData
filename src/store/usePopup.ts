import { create } from 'zustand';
import { PopupState } from '@/types/storeType';

/**
 * Zustand store for managing popup state.
 * Provides state variables and actions to open and close the popup with specific content, position, and type.
 *
 * @interface PopupState
 * @property {boolean} isOpen - Indicates if the popup is open.
 * @property {string | null} content - The content to display in the popup.
 * @property {string | null} type - The type of popup (e.g., 'toggle', 'nav', 'list').
 * @property {number} x - X coordinate for popup position.
 * @property {number} y - Y coordinate for popup position.
 * @property {(content: string, x: number, y: number, type: string) => void} openPopup - Function to open the popup with specified content, position, and type.
 * @property {() => void} closePopup - Function to close the popup.
 * @property {(event: React.MouseEvent, label: string, type: string) => void} handleMouseEnter - Function to handle mouse entering and trigger the popup with label and type.
 * @property {() => void} handleMouseLeave - Function to close the popup on mouse leave.
 */

const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  content: null,
  type: null,
  x: 0,
  y: 0,

  openPopup: (content: string, x: number, y: number, type: string) =>
    set({ isOpen: true, content, x, y, type }),
  closePopup: () =>
    set({ isOpen: false, content: null, x: 0, y: 0, type: null }),

  handleMouseEnter: (event: React.MouseEvent, label: string, type: string) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    set({ isOpen: true, content: label, x, y, type });
  },

  handleMouseLeave: () =>
    set({ isOpen: false, content: null, x: 0, y: 0, type: null }),
}));

export default usePopupStore;
