import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { createNewFile } from '@/helpers/createNewFile';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { DropZoneWrapperProps } from '@/types/type';

const DropZoneWrapper: React.FC<DropZoneWrapperProps> = ({
  dropFolderId,
  dropStyle,
}) => {
  const createFiles = useFileStore((state) => state.createFiles);
  const { openModal, closeModal } = useModalStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const fileUrl = URL.createObjectURL(file);

        const newFile = createNewFile(file.name, fileUrl, file as File);

        createFiles(newFile, dropFolderId);
        closeModal();
        openModal('UploadLoader', newFile.id, newFile.filename);

        setTimeout(() => {
          URL.revokeObjectURL(fileUrl);
        }, 10000);
      });
    },

    [createFiles, dropFolderId, openModal, closeModal]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        clsx(dropStyle, {
          'bg-light-blue opacity-70 transition ease-in-out duration-300':
            isDragActive,
        })
      )}
    >
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

export default DropZoneWrapper;
