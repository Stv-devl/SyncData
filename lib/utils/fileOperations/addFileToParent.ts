import { callFilesRecursive } from './callFilesRecursive';
import { FileType } from '@/types/type';

/**
 * Adds a file to the parent directory
 * @param files - The array of files
 * @param newFile - The new file to add
 * @param parentId - The ID of the parent directory
 * @param publicId - The public ID of the file
 * @returns The updated array of files
 */

export const addFileToParent = (
  files: FileType[],
  newFile: FileType,
  parentId: string,
  publicId?: string
): FileType[] => {
  if (parentId === 'root') {
    const newFileWithPublicId = publicId ? { ...newFile, publicId } : newFile;
    return [...files, newFileWithPublicId];
  }
  const newFileWithPublicId = publicId ? { ...newFile, publicId } : newFile;

  const callback = (file: FileType): FileType => {
    if (file.id === parentId) {
      return {
        ...file,
        files: [...(file.files ?? []), newFileWithPublicId],
      };
    }
    return file;
  };

  return callFilesRecursive(files, callback);
};
