import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { ModaleFileProps } from '@/types/type';

/**
 * DeleteFile component that displays a confirmation dialog for deleting a file
 * @component
 * @param {ModaleFileProps} props - The properties for the DeleteFile component
 * @param {string} props.fileId - The ID of the file to delete
 * @param {string|string[]} props.fileName - The name(s) of the file(s) to delete
 * @returns {JSX.Element|null} The rendered DeleteFile component or null if no fileId provided
 */
const DeleteFile: React.FC<ModaleFileProps> = ({ fileId, fileName }) => {
  const { removeFile } = useFileStore();

  if (!fileId) return null;

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
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
        handleAction={(e) =>
          handleDelete(e as React.FormEvent<HTMLFormElement>)
        }
      />
    </div>
  );
};

export default DeleteFile;
