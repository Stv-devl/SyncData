import { findFileRecursive } from 'lib/utils/findFileRecursive';
import { FileType } from '@/types/type';

export const getParentFiles = (files: FileType[], parentId: string) => {
  const parentFolderFiles = findFileRecursive(files, parentId)?.files || [];

  return parentId === 'root' ? files : parentFolderFiles;
};
