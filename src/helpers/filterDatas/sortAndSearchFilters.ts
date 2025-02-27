import { log } from 'node:console';
import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

export const sortAndSearchFilters = (
  files: FileType[] | null,
  flattenedFiles: FileType[] | null,
  filterTools: FilterToolsProps
): FileType[] => {
  const { searchbar, headerType, upselected } = filterTools;

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
