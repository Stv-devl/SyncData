import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { useMemo, useEffect, useRef } from 'react';
import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

const useCurrentFolderName = (
  filterTools: FilterToolsProps,
  parentFolderId: string,
  files: FileType[]
) => {
  const isArray = (input: unknown): input is unknown[] =>
    Object.prototype.toString.call(input) === '[object Array]';

  const prevSearchbar = useRef(filterTools.searchbar);

  const currentFolderName = useMemo(() => {
    if (prevSearchbar.current && !filterTools.searchbar) {
      return 'root';
    }
    if (parentFolderId === 'root') {
      return 'root';
    }
    const folder = findFileRecursive(files ?? [], parentFolderId);
    if (folder && !isArray(folder)) {
      return folder.filename;
    }
    return 'unknown';
  }, [parentFolderId, files, filterTools.searchbar]);

  useEffect(() => {
    prevSearchbar.current = filterTools.searchbar;
  }, [filterTools.searchbar]);

  return currentFolderName;
};

export default useCurrentFolderName;
