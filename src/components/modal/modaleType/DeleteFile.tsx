import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { DeleteFileProps } from '@/types/type';

const DeleteFile: React.FC<DeleteFileProps> = ({ fileId, fileName }) => {
  const { removeFile } = useFileStore();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFile(fileId);
    useModalStore.getState().closeModal();
  };
  return (
    <div className="size-full">
      <h1 className="text-darkest-blue text-title pb-4 ">Delete a file</h1>
      <p>Do you really want to delete this file?</p>
      <span className="text-darkest-blue block truncate font-semibold capitalize">
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
