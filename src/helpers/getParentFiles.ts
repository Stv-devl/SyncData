import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { FileType } from '@/types/type';

export const getParentFiles = (files: FileType[], parentId: string) => {
  const parentFolder = findFileRecursive(files, parentId);

  const parentFolderFiles =
    parentFolder && !Array.isArray(parentFolder)
      ? parentFolder.files || []
      : [];

  return parentId === 'root' ? files : parentFolderFiles;
};
