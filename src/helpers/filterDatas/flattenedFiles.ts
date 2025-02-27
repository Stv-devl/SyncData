import { FileType } from '@/types/type';

/**
 * Flattens an array of files and their nested files into a single array
 * @param {FileType[] | null} files - The array of files to flatten
 * @returns {FileType[]} The flattened array of files
 */
export const flattenedFiles = (files: FileType[] | null): FileType[] => {
  if (!files) return [];

  return files.reduce<FileType[]>((acc, file) => {
    acc.push(file);
    if (file.files?.length) {
      acc.push(...flattenedFiles(file.files));
    }
    return acc;
  }, []);
};
