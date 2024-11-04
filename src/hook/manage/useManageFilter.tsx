'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFileStore } from '@/store/useFileStore';
import { FileType, FilterToolsProps } from '@/types/type';

const useManageFilter = (isActive: boolean) => {
  const { files, displayFiles, setDisplayFiles } = useFileStore();

  const [filterTools, setFilterTools] = useState<FilterToolsProps>({
    headerType: null,
    upselected: null,
    searchbar: '',
  });

  const previousDisplayFiles = useRef<FileType[] | null>(null);

  const allFilesArray = useMemo(() => {
    const getAllFiles = (files: FileType[]): FileType[] => {
      const allFiles: FileType[] = [];
      if (!files) return allFiles;
      for (const file of files) {
        allFiles.push(file);
        if (file.files) {
          allFiles.push(...getAllFiles(file.files));
        }
      }
      return allFiles;
    };
    return getAllFiles(files || []);
  }, [files]);

  const searchFilter = useMemo(() => {
    if (!filterTools.searchbar) return displayFiles;
    const searchTerm = filterTools.searchbar.toLowerCase();
    return allFilesArray.filter((el) =>
      Object.values(el).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
  }, [allFilesArray, filterTools.searchbar]);

  const sortedFiles = useMemo(() => {
    if (!filterTools.headerType) return searchFilter;
    const { headerType, upselected } = filterTools;
    const direction = upselected ? 1 : -1;
    return [...(displayFiles || [])].sort(
      (a, b) =>
        String(a[headerType]).localeCompare(String(b[headerType])) * direction
    );
  }, [searchFilter, filterTools.headerType, filterTools.upselected]);

  useEffect(() => {
    if (isActive && !previousDisplayFiles.current) {
      previousDisplayFiles.current = displayFiles;
    }
  }, [isActive, displayFiles]);

  useEffect(() => {
    if (isActive) {
      if (filterTools.searchbar.length === 0) {
        setDisplayFiles(previousDisplayFiles.current || []);
      }
      if (filterTools.searchbar.length > 0 || filterTools.headerType) {
        setDisplayFiles(sortedFiles || []);
      }
    }
  }, [isActive, sortedFiles, allFilesArray, filterTools, setDisplayFiles]);

  const handleChange = useCallback(
    (
      updates: React.ChangeEvent<HTMLInputElement> | Partial<FilterToolsProps>
    ) => {
      if ('target' in updates) {
        const { name, value } = updates.target;
        setFilterTools((prev) => ({ ...prev, [name]: value }));
      } else {
        setFilterTools((prev) => ({ ...prev, ...updates }));
      }
    },
    []
  );
  return {
    filterTools,
    handleChange,
  };
};

export default useManageFilter;
