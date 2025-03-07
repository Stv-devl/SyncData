import { useEffect } from 'react';
import useModalStore from '@/store/ui/useModale';

/**
 * Custom hook to automatically close the modal after a given delay.
 * @param {number} delay - Time in milliseconds before the modal closes.
 */
const useAutoCloseModal = (delay = 3000) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      useModalStore.getState().closeModal();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);
};

export default useAutoCloseModal;
