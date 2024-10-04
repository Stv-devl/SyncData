import { BurgerState } from '@/types/storeType';
import { create } from 'zustand';

/**
 * Zustand store for managing modal state.
 * Provides state variables and actions to open and close the burger menu.
 * @interface BurgerState
 * @property {boolean} isOpen - Indicates if the burger menu is open.
 * @property {(content: string) => void} openModal - Function to open the burger menu
 * @property {() => void} closeBurger - Function to close the burger menu.
 */

const useBurgerStore = create<BurgerState>((set) => ({
  isOpen: false,
  toggleBurger: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useBurgerStore;
