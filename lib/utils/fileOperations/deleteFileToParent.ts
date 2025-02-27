import { callFilesRecursive } from './callFilesRecursive';
import { FileType } from '@/types/type';

/**
 * Deletes a file from the parent directory
 * @param files - The array of files
 * @param fileId - The ID of the file to delete
 * @param parentId - The ID of the parent directory
 * @returns The updated array of files
 */

export const deleteFileToParent = (
  files: FileType[],
  fileId: string | string[],
  parentId: string
): FileType[] => {
  const idsToDelete = Array.isArray(fileId) ? fileId : [fileId];

  const callback = (file: FileType): FileType => {
    if (file.id === parentId && file.files) {
      return {
        ...file,
        files: file.files.filter((child) => !idsToDelete.includes(child.id)),
      };
    }
    return file;
  };

  return callFilesRecursive(files, callback);
};
