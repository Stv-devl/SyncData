import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useModalStore from '@/store/useModale';
import { useUserStore } from '@/store/useUserStore';

const DeleteFile = ({ fileId }) => {
  const { files, removeFile } = useUserStore();
  console.log(fileId);

  const handleDelete = (e) => {
    e.preventDefault();
    removeFile(fileId);
    useModalStore.getState().closeModal();
  };
  return (
    <div className="h-full ">
      <h1 className="text-darkest-blue text-title pb-4">Delete a file</h1>
      <p className="pb-8">Do you really want to delete this file?</p>
      <ButtonModalWrapper
        actionLabel="Delete"
        handleAction={(e) => handleDelete(e)}
      />
    </div>
  );
};

export default DeleteFile;
