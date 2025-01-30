import { create } from 'zustand';
import { PopupState } from '@/types/storeType';

/**
 * Zustand store for managing popup state.
 * Provides state variables and actions to open and close the popup with specific content, position, type, and additional styles.
 *
 * @interface PopupState
 * @property {boolean} isOpen - Indicates if the popup is open.
 * @property {string | null} content - The content to display in the popup.
 * @property {string | null} transformStyle - CSS transform styles to apply to the popup.
 * @property {boolean} isInfo - Indicates if the popup is an info type.
 * @property {number} x - X coordinate for the popup position.
 * @property {number} y - Y coordinate for the popup position.
 * @property {() => void} closePopup - Function to close the popup.
 * @property {(event: React.MouseEvent, label: string, transformStyle: string) => void} handleMouseEnter - Function to handle mouse entering and trigger the popup with label and transform style.
 * @property {(event: React.MouseEvent, label: string, rect: DOMRect) => void} handleClickOpen - Function to handle click events and open the popup with specific label and position (based on DOMRect).
 * @property {(event: MouseEvent) => void} handleClickClose - Function to handle clicks outside the popup and close it.
 * @property {() => void} handleMouseLeave - Function to close the popup on mouse leave.
 */

const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  content: null,
  fileId: null,
  x: -20,
  y: -20,
  transformStyle: null,
  isInfo: false,

  closePopup: () =>
    set({
      isOpen: false,
      content: null,
      fileId: null,
      x: -20,
      y: -20,
      isInfo: false,
      transformStyle: null,
    }),

  handleMouseEnter: (
    event: React.MouseEvent,
    label: string,
    transformStyle: string
  ) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    set({ isOpen: true, content: label, x, y, transformStyle, isInfo: false });
  },

  handleClickOpen: (
    event: React.MouseEvent,
    label: string,
    rect: DOMRect | { x: number; y: number },
    fileId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setTimeout(() => {
      const x = 'left' in rect ? rect.left : rect.x;
      const y = 'bottom' in rect ? rect.bottom : rect.y;
      set({ isOpen: true, content: label, x, y, isInfo: true, fileId });
    }, 100);
  },

  handleMouseLeave: () => usePopupStore.getState().closePopup(),
}));

export default usePopupStore;
