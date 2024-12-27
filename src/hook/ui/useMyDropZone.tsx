import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileStore } from '@/store/useFileStore';
import { DropZoneReturn } from '@/types/type';
import { getFileType } from '@/utils/getFileType';

const useMyDropZone = (dropFolderId: string): DropZoneReturn => {
  const dropNewFiles = useFileStore((state) => state.dropNewFiles);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const name = file.name;
        const type = getFileType(file.name);

        if (dropFolderId) {
          dropNewFiles(name, type, dropFolderId);
        } else {
          console.error('Drop folder ID is undefined');
        }
      });
    },
    [dropNewFiles, dropFolderId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: true,
  });

  return { getRootProps, getInputProps, isDragActive };
};

export default useMyDropZone;
