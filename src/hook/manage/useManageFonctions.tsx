import React, { useCallback } from 'react';
import useManageDownload from './useManageDownload';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

const useManageFonctions = () => {
  const { toggleFavoriteFiles, toggleEditedFile } = useFileStore();
  const { handleDownload } = useManageDownload();
  const handleInformation = () => {
    console.log('information');
  };

  const handleShare = () => {
    console.log('share');
  };

  const handleMoveFile = () => {
    console.log('move file');
  };

  const getActionByType = useCallback(
    (type: string, fileId: string | string[], fileName: string | string[]) => {
      switch (type) {
        case 'upload':
          return useModalStore
            .getState()
            .openModal('UploadFile', fileId, fileName);
        case 'create':
          return useModalStore
            .getState()
            .openModal('CreateFolder', fileId, fileName);
        case 'information':
          return handleInformation();
        case 'favorite':
          return toggleFavoriteFiles(fileId);
        case 'share':
          return handleShare();
        case 'download':
          return handleDownload(fileId);
        case 'move':
          return handleMoveFile();
        case 'change':
          return toggleEditedFile(fileId);
        case 'delete':
          return useModalStore
            .getState()
            .openModal('DeleteFile', fileId, fileName);

        default:
          return () => {};
      }
    },
    [
      handleDownload,
      handleInformation,
      handleMoveFile,
      toggleEditedFile,
      toggleFavoriteFiles,
    ]
  );

  return {
    getActionByType,
  };
};

export default useManageFonctions;
