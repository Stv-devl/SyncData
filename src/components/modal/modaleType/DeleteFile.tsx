import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useModalStore from '@/store/useModale';
import { useUserStore } from '@/store/useUserStore';
import { DeleteFileProps } from '@/types/type';

const DeleteFile: React.FC<DeleteFileProps> = ({ fileId, fileName }) => {
  const { removeFile } = useUserStore();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFile(fileId);
    useModalStore.getState().closeModal();
  };
  return (
    <div className="h-full ">
      <h1 className="text-darkest-blue text-title pb-4 ">Delete a file</h1>
      <p>Do you really want to delete this file?</p>
      <span className="text-darkest-blue font-semibold capitalize">
        {Array.isArray(fileName) ? fileName.join(', ') : fileName}
      </span>
      <ButtonModalWrapper
        actionLabel="Delete"
        handleAction={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleDelete(e)
        }
      />
    </div>
  );
};

export default DeleteFile;
