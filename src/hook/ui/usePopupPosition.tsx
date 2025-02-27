import React, { useEffect, useState } from 'react';
import usePopupStore from '@/store/ui/usePopup';

/**
 * Custom hook for managing popup position
 * @param {React.RefObject<HTMLDivElement>} popupRef - The ref of the popup
 * @returns {Object} Object containing popupPosition
 */
const usePopupPosition = (popupRef: React.RefObject<HTMLDivElement>) => {
  const { isOpen, x, y } = usePopupStore();

  const [popupPosition, setPopupPosition] = useState({ top: y, left: x });

  const MARGIN = 10;
  const OFFSET_X = 50;
  const OFFSET_Y = 10;

  useEffect(() => {
    if (isOpen && popupRef.current) {
      const { offsetWidth, offsetHeight } = popupRef.current;
      let adjustedX = x + OFFSET_X;
      let adjustedY = y + OFFSET_Y;
      adjustedX = Math.max(
        MARGIN,
        Math.min(adjustedX, window.innerWidth - offsetWidth - MARGIN)
      );
      adjustedY = Math.max(
        MARGIN,
        Math.min(adjustedY, window.innerHeight - offsetHeight - MARGIN)
      );
      setPopupPosition({ top: adjustedY, left: adjustedX });
    }
  }, [isOpen, x, y, popupRef]);

  return {
    popupPosition,
  };
};

export default usePopupPosition;
