import { FileType } from '@/types/type';

/**
 * Filters the files to only include folders.
 * @param {FileType[]} files - The files to filter.
 * @returns {FileType[]} The filtered files.
 */
export const filteredFolders = (files: FileType[]) => {
  return files && files.filter((element) => element.type === 'folder');
};
