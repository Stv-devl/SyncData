import { create } from 'zustand';
import { BurgerState } from '@/types/storeType';

/**
 * useBurgerStore function
 * @returns {BurgerState} The burger state
 */
const useBurgerStore = create<BurgerState>((set) => ({
  isOpen: false,

  toggleBurger: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useBurgerStore;
