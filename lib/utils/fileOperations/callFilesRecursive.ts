import { FileType } from '@/types/type';

/**
 * Calls a callback function for each file in the array
 * @param files - The array of files
 * @param callback - The callback function
 * @param parent - The parent file
 * @returns The updated array of files
 */

export const callFilesRecursive = (
  files: FileType[],
  callback: (file: FileType, parent?: FileType) => FileType,
  parent?: FileType
): FileType[] => {
  return files.map((file) => {
    const newFile = callback(file, parent);

    if (file.files?.length) {
      newFile.files = callFilesRecursive(
        newFile.files || file.files,
        callback,
        newFile
      );
    }

    return newFile;
  });
};
