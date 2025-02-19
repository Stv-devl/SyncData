import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React from 'react';
import { useFileStore } from '@/store/useFileStore';
const useManageDownload = () => {
  const files = useFileStore((state) => state.files);

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

  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
