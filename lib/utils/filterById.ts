import { findFileRecursive } from './findFileRecursive';
import { FileType } from '@/types/type';

export const filterById = (
  files: FileType[],
  fileId: string | string[]
): string | null => {
  const targetId = Array.isArray(fileId) ? fileId[0] : fileId;
  const folder = findFileRecursive(files, targetId, (folder) => folder);
  return folder ? folder.id : null;
};
