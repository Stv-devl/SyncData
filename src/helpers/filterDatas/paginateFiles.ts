import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

export const paginateFiles = (
  files: FileType[],
  currentPage: number,
  entriesPerPage: number | null,
  filterTools: FilterToolsProps
): FileType[] => {
  const { searchbar } = filterTools;

  if (searchbar?.trim()) {
    return files;
  }

  if (entriesPerPage === null) return files;

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = currentPage * entriesPerPage;

  return files.slice(startIndex, endIndex);
};
