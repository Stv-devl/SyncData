import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import usePopupPosition from '../../hook/ui/usePopupPosition';
import InfoWrapper from './InfoWrapper';
import usePopupEffect from '@/hook/ui/usePopupEffect';
import usePopupStore from '@/store/ui/usePopup';

/**
 * Popup component that displays a popup with a content based on the popup type
 * @component
 * @returns {JSX.Element} The rendered Popup component with a content based on the popup type
 */
const Popup = () => {
  const popupRef = useRef<HTMLDivElement>(null);

  const { isOpen, content, fileId, x, y, transformStyle, isInfo, closePopup } =
    usePopupStore();

  const { popupPosition } = usePopupPosition(popupRef);

  usePopupEffect(isOpen, popupRef, closePopup);

  /**
   * Gets the popup class based on the open state
   * @returns {string} The popup class
   */
  const popupClass = useMemo(
    () =>
      twMerge(
        clsx(isOpen ? 'opacity-100' : 'opacity-0'),
        'fixed rounded-xl transition-opacity duration-500 ease-in-out'
      ),
    [isOpen]
  );

  /**
   * Gets the style for the popup
   * @returns {Object} The style for the popup
   */
  const style = {
    top: y,
    left: x,
    transform: transformStyle || '',
    opacity: isOpen ? 1 : 0,
  };

  return (
    <>
      {isInfo ? (
        <div
          ref={popupRef}
          id="popup"
          className={twMerge(
            popupClass,
            ' bg-white  border border-regular-gray'
          )}
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <InfoWrapper fileName={content} fileId={fileId ? fileId : null} />
        </div>
      ) : (
        <div
          className={twMerge(
            popupClass,
            'hidden sm:block absolute bg-black px-3 py-2 text-white'
          )}
          style={style}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Popup;
