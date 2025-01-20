import { callFilesRecursive } from './callFilesRecursive';
import { FileType } from '@/types/type';

export const deleteFileToParent = (
  files: FileType[],
  fileId: string | string[],
  parentId: string
): FileType[] => {
  const idsToDelete = Array.isArray(fileId) ? fileId : [fileId];

  const callback = (file: FileType): FileType => {
    if (file.id === parentId && file.files) {
      return {
        ...file,
        files: file.files.filter((child) => !idsToDelete.includes(child.id)),
      };
    }
    return file;
  };

  return callFilesRecursive(files, callback);
};
