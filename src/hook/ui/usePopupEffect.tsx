import { useEffect } from 'react';

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
