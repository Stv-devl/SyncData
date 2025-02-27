import { paginateFiles } from './paginateFiles';
import { sortAndSearchFilters } from './sortAndSearchFilters';
import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

/**
 * Gets the display files for the application
 * @param {FileType[] | null} files - The array of files to display
 * @param {FileType[] | null} flattenedFiles - The flattened array of files
 * @param {FilterToolsProps} filterTools - The filter tools for the application
 * @param {number} currentPage - The current page of the application
 * @param {number} entriesPerPage - The number of entries per page of the application
 * @returns {FileType[]} The display files for the application
 */
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

  return paginateFiles(filteredFiles, currentPage, entriesPerPage, filterTools);
};
