import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';
import { modalsMap } from '../../constantes/modalsMap';
import useModalStore from '@/store/ui/useModale';

const Modal = () => {
  const { isOpen, type, fileId, fileName } = useModalStore();

  if (!isOpen) return null;

  const ModalContent = modalsMap[type as keyof typeof modalsMap];

  return (
    <div className="bg-dark-gray/40 z-99 fixed inset-0 flex justify-center sm:items-center">
      <div className="shadow-custom-gray relative mt-24 w-full bg-white p-6 sm:mt-0 sm:w-[420px] sm:rounded-lg sm:p-8">
        {ModalContent && <ModalContent fileId={fileId} fileName={fileName} />}
        <div
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => useModalStore.getState().closeModal()}
        >
          <iconsMap.IconCross />
        </div>
      </div>
    </div>
  );
};
export default Modal;
