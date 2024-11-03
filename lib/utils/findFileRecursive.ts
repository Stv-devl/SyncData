import { FileType } from '@/types/type';

export const findFileRecursive = (
  files: FileType[],
  id: string,
  action?: (file: FileType) => FileType
): FileType | null => {
  for (const file of files) {
    if (file.id === id) return action ? action(file) : file;
    if (file.files) {
      const found = findFileRecursive(file.files, id, action);
      if (found) return found;
    }
  }
  return null;
};
