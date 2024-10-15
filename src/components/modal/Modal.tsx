import React from 'react';
import useModalStore from '@/store/useModale';
import { modalComponent } from '../../constantes/modalComponent';
import { icones } from '../../constantes/constantes';

const Modal = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  const ModalContent = modalComponent[type as keyof typeof modalComponent];

  return (
    <div className="bg-dark-gray/40 z-99 fixed inset-0 flex justify-center sm:items-center">
      <div className="shadow-custom-gray sm-h-full relative mt-24 flex h-[440px] w-[95%] flex-col items-center justify-center rounded-lg bg-white p-6 sm:mt-0 sm:h-[480px] sm:w-[420px] sm:p-8">
        {ModalContent && <ModalContent />}
        <div
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => useModalStore.getState().closeModal()}
        >
          <icones.IconCross />
        </div>
      </div>
    </div>
  );
};
export default Modal;
