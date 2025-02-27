import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React from 'react';
import { useFileStore } from '@/store/useFileStore';

/**
 * Custom hook for managing file downloads
 * @returns {Object} Object containing handleDownload function
 */
const useManageDownload = () => {
  const files = useFileStore((state) => state.files);

  /**
   * Downloads multiple files as a zip archive
   * @param {Array<{url: string, filename: string}>} fileUrls - Array of file URLs and filenames to download
   */
  const handleFilesDownload = async (
    fileUrls: { url: string; filename: string }[]
  ) => {
    const zip = new JSZip();

    for (const { url, filename } of fileUrls) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(filename, blob);
      } catch (error) {
        console.warn(`Failed to fetch file: ${filename} from ${url}`, error);
      }
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `newFiles.zip`);
    });
  };

  /**
   * Downloads a single file
   * @param {string} fileUrl - URL of the file to download
   * @param {string} fileName - Name to save the file as
   */
  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Gets file URLs and filenames from file IDs
   * @param {string | string[]} fileIds - Single file ID or array of file IDs
   * @returns {Array<{url: string, filename: string}>} Array of file URLs and filenames
   */
  const getFileUrls = (fileIds: string | string[]) => {
    if (!files) {
      console.warn('No files available in the store.');
      return [];
    }

    const ids = Array.isArray(fileIds) ? fileIds : [fileIds];
    return ids.flatMap((id) => {
      const file = findFileRecursive(files, id);

      if (Array.isArray(file)) {
        return file
          .filter((file) => file.url && file.filename)
          .map((file) => ({ url: file.url!, filename: file.filename! }));
      }

      if (file?.url && file?.filename) {
        return [{ url: file.url, filename: file.filename }];
      }

      console.warn(`File not found for ID: ${id}`);
      return [];
    });
  };

  /**
   * Main download handler that processes single or multiple file downloads
   * @param {string | string[]} fileIds - Single file ID or array of file IDs to download
   */
  const handleDownload = async (fileIds: string | string[]) => {
    const fileUrls = getFileUrls(fileIds);

    if (fileUrls.length > 1) {
      await handleFilesDownload(fileUrls);
    } else if (fileUrls.length === 1) {
      const { url, filename } = fileUrls[0];
      handleFileDownload(url, filename);
    }
  };

  return { handleDownload };
};

export default useManageDownload;
