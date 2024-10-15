import React from 'react';
import useModalStore from '@/store/useModale';
import { modalComponent } from '../../constantes/modalComponent';

const Modal = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  const ModalContent = modalComponent[type as keyof typeof modalComponent];

  return (
    <div className="bg-dark-gray/40 z-99 fixed inset-0 flex items-center justify-center">
      <div className="shadow-custom-gray relative flex flex-col items-center justify-center rounded-lg bg-white p-7">
        {ModalContent && <ModalContent />}
        <div
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => useModalStore.getState().closeModal()}
        >
          X
        </div>
      </div>
    </div>
  );
};
export default Modal;
