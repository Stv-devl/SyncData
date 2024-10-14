import React, { useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import InfoWrapper from './InfoWrapper';
import useManagePosition from '../../hook/manage/useManagePosition';
import usePopupStore from '@/store/usePopup';
import clsx from 'clsx';

const Popup = () => {
  const popupRef = useRef<HTMLDivElement>(null);

  const { isOpen, content, x, y, transformStyle, isInfo } = usePopupStore();

  const { popupPosition } = useManagePosition(popupRef);

  const popupClass = useMemo(
    () =>
      twMerge(
        clsx(isOpen ? 'opacity-100' : 'opacity-0'),
        'fixed rounded-xl transition-opacity duration-500 ease-in-out'
      ),
    [isOpen]
  );

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
          <InfoWrapper fileName={content} />
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
