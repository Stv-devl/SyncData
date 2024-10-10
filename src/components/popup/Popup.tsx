import React from 'react';
import usePopupStore from '../../store/usePopup';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Popup = () => {
  const { isOpen, content, x, y, type } = usePopupStore();

  const transformStyle =
    type === 'toogle'
      ? 'translate(-10%, -105%)'
      : type === 'nav'
      ? 'translate(-20%, -105%)'
      : 'translate(-35%, -105%)';

  return (
    <div
      className={twMerge(
        clsx(isOpen ? 'opacity-100' : 'opacity-0'),
        ' fixed rounded-xl bg-black px-3 py-2 text-white transition-opacity duration-500 ease-in-out'
      )}
      style={{
        top: y,
        left: x,
        transform: transformStyle,
        opacity: isOpen ? 1 : 0,
      }}
    >
      {content}
    </div>
  );
};

export default Popup;
