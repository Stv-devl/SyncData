import { useEffect } from 'react';

/**
 * Custom hook for managing popup effects
 * @param {boolean} isOpen - Whether the popup is open
 * @param {React.RefObject<HTMLDivElement>} popupRef - The ref of the popup
 * @param {Function} closePopup - The function to close the popup
 * @returns {void}
 */
const usePopupEffect = (
  isOpen: boolean,
  popupRef: React.RefObject<HTMLDivElement>,
  closePopup: () => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, popupRef, closePopup]);
};

export default usePopupEffect;
