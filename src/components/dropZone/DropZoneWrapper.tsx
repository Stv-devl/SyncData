import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { DropZoneWrapperProps } from '@/types/type';
import { getFileType } from '@/utils/getFileType';

/**
 * DropZoneWrapper component that displays a drop zone for file uploads
 * @param {Object} props - Component props
 * @param {string} props.dropStyle - The style of the drop zone
 * @param {string} props.dropFolderId - The ID of the drop folder
 * @returns {JSX.Element} The rendered DropZoneWrapper component
 */

const DropZoneWrapper: React.FC<DropZoneWrapperProps> = ({
  dropStyle,
  dropFolderId,
}) => {
  const createFiles = useFileStore((state) => state.createFiles);
  const { openModal, closeModal } = useModalStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const fileUrl = URL.createObjectURL(file);

        const newFile = {
          id: generateId(),
          filename: file.name,
          type: getFileType(file.name),
          url: fileUrl,
          file: file as File,
          files: [],
          acces: 'only you',
          modified: getCurrentDate(),
        };

        createFiles(newFile, dropFolderId, false);
        closeModal();
        openModal('UploadLoader', newFile.id, newFile.filename);

        setTimeout(() => {
          URL.revokeObjectURL(fileUrl);
        }, 10000);
      });
    },

    [createFiles, openModal, dropFolderId, closeModal]
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
