import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import EmptyContent from './EmptyContent';
import { useFileStore } from '@/store/useFileStore';
import { DropZoneWrapperProps } from '@/types/type';
import { getFileType } from '@/utils/getFileType';

const DropZoneWrapper: React.FC<DropZoneWrapperProps> = ({
  isDragIcon,
  dropFolderId,
  dropStyle,
}) => {
  const createFiles = useFileStore((state) => state.createFiles);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const newFolder = {
          name: file.name,
          parentId: dropFolderId,
          type: getFileType(file.name),
        };
        createFiles(newFolder);
      });
    },
    [createFiles, dropFolderId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={twMerge(clsx(dropStyle, { 'bg-light-blue': isDragActive }))}
    >
      <input {...getInputProps()} className="hidden" />
      {isDragIcon && <EmptyContent />}
    </div>
  );
};

export default DropZoneWrapper;
