import React, { useCallback } from 'react';
import useModalStore from '@/store/useModale';

const useManageFonctions = () => {
  const handleInformation = () => {
    console.log('information');
  };

  const handleDownload = () => {
    console.log('download');
  };

  const handleShare = () => {
    console.log('share');
  };

  const handleFavorite = () => {
    console.log('favorite');
  };

  const handleMoveFile = () => {
    console.log('move file');
  };

  const handleChangeName = () => {
    console.log('change name');
  };

  const getActionByType = useCallback((type: string) => {
    switch (type) {
      case 'information':
        return handleInformation();
      case 'favorite':
        return handleFavorite();
      case 'share':
        return handleShare();
      case 'download':
        return handleDownload();
      case 'move':
        return handleMoveFile();
      case 'change':
        return handleChangeName();
      case 'delete':
        return useModalStore.getState().openModal('DeleteFile');
      default:
        return () => {};
    }
  }, []);

  return {
    getActionByType,
  };
};

export default useManageFonctions;
