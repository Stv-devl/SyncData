import { callFilesRecursive } from './callFilesRecursive';
import { FileType } from '@/types/type';

export const addFileToParent = (
  files: FileType[],
  newFile: FileType,
  parentId: string,
  publicId?: string
): FileType[] => {
  if (parentId === 'root') {
    const newFileWithPublicId = publicId ? { ...newFile, publicId } : newFile;
    return [...files, newFileWithPublicId];
  }
  const newFileWithPublicId = publicId ? { ...newFile, publicId } : newFile;

  const callback = (file: FileType): FileType => {
    if (file.id === parentId) {
      return {
        ...file,
        files: [...(file.files ?? []), newFileWithPublicId],
      };
    }
    return file;
  };

  return callFilesRecursive(files, callback);
};
