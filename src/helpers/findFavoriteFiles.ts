import { FileType } from '@/types/type';

export const findFavoriteFiles = (files: FileType[]): FileType[] => {
  const findFavoriteFile = (file: FileType): FileType[] =>
    file.isFavorite && file.type !== 'folder'
      ? [file, ...(file.files?.flatMap(findFavoriteFile) || [])]
      : file.files?.flatMap(findFavoriteFile) || [];

  return files.flatMap(findFavoriteFile) || [];
};
