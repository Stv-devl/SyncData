import { FileType } from '@/types/type';

export const addFileToParent = (
  files: FileType[],
  newFile: FileType,
  parentId: string
): FileType[] => {
  if (parentId === 'root') {
    return [...files, newFile];
  }
  return files.map((file) => {
    if (file.id === parentId) {
      return {
        ...file,
        files: [...(file.files || []), newFile],
      };
    }

    if (file.files) {
      return {
        ...file,
        files: addFileToParent(file.files, newFile, parentId),
      };
    }

    return file;
  });
};
