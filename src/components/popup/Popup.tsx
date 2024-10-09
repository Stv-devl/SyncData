import React from 'react';
import usePopupStore from '../../store/usePopup';

const Popup = () => {
  const { isOpen, content, x, y } = usePopupStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed rounded-xl bg-black px-3 py-2 text-white"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: 'translate(-35%, -105%)',
      }}
    >
      {content}
    </div>
  );
};

export default Popup;
