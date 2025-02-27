import React, { useCallback } from 'react';
import useCopyToClipboard from '../ui/useCopyLink';
import useManageDownload from './useManageDownload';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

/**
 * * Custom hook for managing file-related actions.
 * This hook centralizes file operations and opening modals.
 * @returns {Object} Object containing getActionByType function
 */
const useManageFonctions = () => {
  const { toggleFavoriteFiles, toggleEditedFile } = useFileStore();
  const { handleDownload } = useManageDownload();
  const { copyToClipboard } = useCopyToClipboard();

  /**
   * Executes the corresponding action based on the given action type
   * @param {string} type - The type of action
   * @param {string | string[]} fileId - The file id
   * @param {string | string[]} fileName - The file name
   * @returns {void}
   */
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
          return console.log('information in construction');
        case 'favorite':
          return toggleFavoriteFiles(fileId as string);
        case 'share':
          return copyToClipboard(fileId as string, fileName as string);
        case 'download':
          return handleDownload(fileId);
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
