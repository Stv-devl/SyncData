import { findFileRecursive } from './findFileRecursive';
import { FileType } from '@/types/type';

export const getClickedFolder = (
  files: FileType[],
  fileId: string
): FileType | null => {
  const clickedFile = findFileRecursive(files, fileId);
  return clickedFile && clickedFile.type === 'folder' ? clickedFile : null;
};
