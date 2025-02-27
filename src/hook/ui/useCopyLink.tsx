import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React, { useRef } from 'react';
import { useCallback } from 'react';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

/**
 * Custom hook for copying a file link to the clipboard
 * @returns {Object} Object containing copyToClipboard function
 */
const useCopyToClipboard = () => {
  const filesRef = useRef(useFileStore.getState().files);
  const { openModal, closeModal } = useModalStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Copies a file link to the clipboard
   * @param {string} fileId - The ID of the file to copy
   * @param {string} fileName - The name of the file to copy
   * @returns {void}
   */
  const copyToClipboard = useCallback(
    (fileId: string, fileName: string) => {
      if (!fileId || !filesRef.current) return;

      const file = findFileRecursive(filesRef.current, fileId);
      if (!file || Array.isArray(file) || !file.url) return;

      navigator.clipboard
        .writeText(file.url)
        .then(() => {
          openModal('CopyLink', fileId, fileName);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            closeModal();
            timeoutRef.current = null;
          }, 1000);
        })
        .catch((err) => {
          console.error(`Failed to copy link for ${fileName}:`, err);
        });
    },
    [openModal, closeModal]
  );

  return { copyToClipboard };
};

export default useCopyToClipboard;
