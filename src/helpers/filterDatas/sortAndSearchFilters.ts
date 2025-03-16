import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

/**
 * Sort and search filters for the application
 * @param {FileType[] | null} files - The array of files to sort and search
 * @param {FileType[] | null} flattenedFiles - The flattened array of files
 * @param {FilterToolsProps} filterTools - The filter tools for the application
 * @returns {FileType[]} The sorted and filtered files
 */
export const sortAndSearchFilters = (
  files: FileType[] | null,
  flattenedFiles: FileType[] | null,
  filterTools: FilterToolsProps
): FileType[] => {
  const { searchbar, headerType, upselected } = filterTools;

  /*
  console.log('files dans sortAndSearchFilters', files);
  console.log('flattenedFiles dans sortAndSearchFilters', flattenedFiles);
  console.log('filterTools dans sortAndSearchFilters', filterTools);*/

  const filteredFiles =
    searchbar && flattenedFiles
      ? flattenedFiles.filter((file) => {
          const lowerCaseSearch = searchbar.toLowerCase();
          return file.filename?.toLowerCase().includes(lowerCaseSearch);
        })
      : files || [];

  if (!headerType) return filteredFiles;

  return filteredFiles.sort(
    (a, b) =>
      String(a[headerType]).localeCompare(String(b[headerType])) *
      (upselected ? 1 : -1)
  );
};
