import { findFileRecursive } from './findFileRecursive';
import { FileType } from '@/types/type';

export const findFolderById = (
  folders: FileType[],
  id: string
): FileType | null => {
  return findFileRecursive(folders, id);
};
