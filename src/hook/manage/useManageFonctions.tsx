import React, { useCallback } from 'react';
import useCopyToClipboard from '../ui/useCopyLink';
import useManageDownload from './useManageDownload';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

const useManageFonctions = () => {
  const { toggleFavoriteFiles, toggleEditedFile } = useFileStore();
  const { handleDownload } = useManageDownload();
  const { copyToClipboard } = useCopyToClipboard();

  const getActionByType = useCallback(
    (type: string, fileId: string | string[], fileName: string | string[]) => {
      switch (type) {
        case 'upload':
          return useModalStore
            .getState()
            .openModal('UploadFile', fileId as string[], fileName);
        case 'create':
          return useModalStore
            .getState()
            .openModal('CreateFolder', fileId as string[], fileName);
        case 'information':
          return console.log('information');

        case 'favorite':
          return toggleFavoriteFiles(fileId as string);
        case 'share':
          return copyToClipboard(fileId as string, fileName as string);
        case 'download':
          return handleDownload(fileId);
        case 'move':
          return console.log('move');
        case 'change':
          return toggleEditedFile(fileId as string);
        case 'delete':
          return useModalStore
            .getState()
            .openModal('DeleteFile', fileId as string[], fileName);

        default:
          return () => {};
      }
    },
    [handleDownload, toggleEditedFile, toggleFavoriteFiles, copyToClipboard]
  );

  return {
    getActionByType,
  };
};

export default useManageFonctions;
