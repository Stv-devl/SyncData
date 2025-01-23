import { useEffect } from 'react';

const usePopupEffect = (
  isOpen: boolean,
  handleClickClose: (event: MouseEvent) => void
) => {
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
