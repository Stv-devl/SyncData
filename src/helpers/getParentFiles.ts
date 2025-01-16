import { findFolderById } from 'lib/utils/findFolderById';
import { FileType } from '@/types/type';

export const getParentFiles = (files: FileType[], parentId: string) => {
  const parentFolderFiles = findFolderById(files, parentId)?.files || [];

  return parentId === 'root' ? files : parentFolderFiles;
};
