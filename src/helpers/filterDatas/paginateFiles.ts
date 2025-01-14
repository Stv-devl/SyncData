import { FileType } from '@/types/type';

export const paginateFiles = (
  files: FileType[],
  currentPage: number,
  entriesPerPage: number
): FileType[] => {
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = currentPage * entriesPerPage;
  return files.slice(startIndex, endIndex);
};
