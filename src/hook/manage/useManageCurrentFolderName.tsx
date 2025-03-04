import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { useMemo, useEffect, useRef } from 'react';
import { FilterToolsProps } from '@/types/storeType';
import { FileType } from '@/types/type';

/**
 * Custom hook that manages and returns the current folder name based on various conditions
 * @param {FilterToolsProps} filterTools - Object containing filter settings including searchbar state
 * @param {string} parentFolderId - ID of the parent folder to get name for
 * @param {FileType[]} files - Array of file objects to search through
 * @returns {string} Name of the current folder - either 'root', the folder's filename, or 'unknown'
 */
const useCurrentFolderName = (
  filterTools: FilterToolsProps,
  parentFolderId: string,
  files: FileType[]
) => {
  /**
   * Type guard function to check if a value is an array
   */
  const isArray = (input: unknown): input is unknown[] =>
    Object.prototype.toString.call(input) === '[object Array]';

  const prevSearchbar = useRef(filterTools.searchbar);

  /**
   * Memoized computation of the current folder name based on searchbar state,
   * parent folder ID and available files
   * @returns {string} The computed folder name
   */
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
