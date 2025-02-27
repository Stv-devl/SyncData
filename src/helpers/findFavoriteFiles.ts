import { FileType } from '@/types/type';

/**
 * Finds the favorite files in the array of files
 * @param {FileType[]} files - The array of files to find the favorite files in
 * @returns {FileType[]} The array of favorite files
 */
export const findFavoriteFiles = (files: FileType[]): FileType[] => {
  const findFavoriteFile = (file: FileType): FileType[] =>
    file.isFavorite && file.type !== 'folder'
      ? [file, ...(file.files?.flatMap(findFavoriteFile) || [])]
      : file.files?.flatMap(findFavoriteFile) || [];

  return files.flatMap(findFavoriteFile) || [];
};
