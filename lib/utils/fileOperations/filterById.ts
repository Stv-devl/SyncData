import { callFilesRecursive } from './callFilesRecursive';
import { FileType } from '@/types/type';

/**
 * Filters files by ID
 * @param files - The array of files
 * @param fileId - The ID of the file to filter
 * @returns The filtered array of files
 */

export const filterById = (
  files: FileType[],
  fileId: string | string[]
): FileType[] => {
  const targetIds = Array.isArray(fileId) ? fileId : [fileId];

  let filtered = files.filter((f) => !targetIds.includes(f.id));

  filtered = callFilesRecursive(filtered, (file) => {
    if (file.files) {
      return {
        ...file,
        files: file.files.filter((child) => !targetIds.includes(child.id)),
      };
    }
    return file;
  });

  return filtered;
};
