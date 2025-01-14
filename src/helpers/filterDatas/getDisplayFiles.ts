import { paginateFiles } from './paginateFiles';
import { sortAndSearchFilters } from './sortAndSearchFilters';
import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

export const getDisplayFiles = (
  files: FileType[] | null,
  flattenedFiles: FileType[] | null,
  filterTools: FilterToolsProps,
  currentPage: number,
  entriesPerPage: number
): FileType[] => {
  if (!files) return [];
  const filteredFiles = sortAndSearchFilters(
    files,
    flattenedFiles,
    filterTools
  );
  return paginateFiles(filteredFiles, currentPage, entriesPerPage);
};
