import React, { useState, useEffect, useCallback } from 'react';
import useModalStore from '../../../store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

const UploadLoader: React.FC<{ fileName?: string; fileId?: string }> = ({
  fileName,
  fileId,
}) => {
  const isUploaded = useFileStore((state) => state.isUploaded);
  const closeModal = useModalStore((state) => state.closeModal);

  const [uploadState, setUploadState] = useState<
    'idle' | 'uploading' | 'uploaded' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);

  const startUpload = useCallback(() => {
    if (!fileName || !fileId) {
      setError('No file to upload');
      setUploadState('error');
      setTimeout(closeModal, 1000);
      return;
    }
    setUploadState('uploading');
    setError(null);
  }, [fileName, fileId, closeModal]);

  useEffect(() => {
    startUpload();
  }, [startUpload]);

  useEffect(() => {
    if (isUploaded && uploadState === 'uploading') {
      setUploadState('uploaded');
      setTimeout(closeModal, 1000);
    }
  }, [isUploaded, closeModal, uploadState]);

  const renderContent = () => {
    switch (uploadState) {
      case 'uploading':
        return (
          <>
            <h3 className="text-darkest-blue text-lg font-semibold">
              Uploading:
            </h3>
            <div className="border-t-dark-blue size-12 animate-spin rounded-full border-8 border-gray-200"></div>
          </>
        );
      case 'uploaded':
        return (
          <p className="text-darkest-blue mt-4 font-medium">
            Upload completed successfully
          </p>
        );
      case 'error':
        return <p className="mt-2 text-sm text-red-500">Error: {error}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderContent()}
    </div>
  );
};

export default UploadLoader;
