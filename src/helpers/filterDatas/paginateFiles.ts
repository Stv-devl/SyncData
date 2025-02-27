import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

/**
 * Paginate files based on the current page and entries per page
 * @param {FileType[]} files - The array of files to paginate
 * @param {number} currentPage - The current page of the application
 * @param {number | null} entriesPerPage - The number of entries per page of the application
 * @param {FilterToolsProps} filterTools - The filter tools for the application
 */
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
