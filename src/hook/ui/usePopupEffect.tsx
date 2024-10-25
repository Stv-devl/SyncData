import { useEffect } from 'react';

const usePopupEffect = (isOpen, handleClickClose) => {
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickClose);
    } else {
      window.removeEventListener('click', handleClickClose);
    }

    return () => {
      window.removeEventListener('click', handleClickClose);
    };
  }, [isOpen, handleClickClose]);
};

export default usePopupEffect;
