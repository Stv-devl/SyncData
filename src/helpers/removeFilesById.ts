import { FileType } from '@/types/type';

/**
 * Removes files from an array by their id
 * @param {FileType[]} files - The array of files to remove the files from
 * @param {string | string[]} fileId - The id of the file to remove
 * @returns {FileType[]} The array of files without the removed files
 */
export const removeFilesById = (
  files: FileType[],
  fileId: string | string[]
) => {
  return files.filter((file) =>
    Array.isArray(fileId) ? !fileId.includes(file.id) : file.id !== fileId
  );
};
