import React from 'react';
import useModalStore from '@/store/useModale';
import { modalComponent } from '../../constantes/modalComponent';

const Modal = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  const ModalContent = modalComponent[type as keyof typeof modalComponent];

  return (
    <div
      className="bg-dark-gray/40 z-99 fixed inset-0 flex items-center justify-center"
      onClick={() => useModalStore.getState().closeModal()}
    >
      <div className="shadow-custom-gray rounded-lg bg-white p-10">
        {ModalContent && <ModalContent />}
      </div>
    </div>
  );
};
export default Modal;
