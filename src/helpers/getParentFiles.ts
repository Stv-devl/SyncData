import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { FileType } from '@/types/type';

/**
 * Gets the parent files for the application
 * @param {FileType[]} files - The array of files to get the parent files from
 * @param {string} parentId - The parentId of the file
 * @returns {FileType[]} The parent files for the application
 */
export const getParentFiles = (files: FileType[], parentId: string) => {
  const parentFolder = findFileRecursive(files, parentId);

  const parentFolderFiles =
    parentFolder && !Array.isArray(parentFolder)
      ? parentFolder.files || []
      : [];

  return parentId === 'root' ? files : parentFolderFiles;
};
