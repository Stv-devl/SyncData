import { FileType } from '@/types/type';

export const addFileToParent = (
  files: FileType[],
  newFile: FileType,
  parentId: string,
  publicId?: string
): FileType[] => {
  const newFileWithPublicId = publicId ? { ...newFile, publicId } : newFile;

  if (parentId === 'root') {
    return [...files, newFile];
  }
  return files.map((file) => {
    if (file.id === parentId) {
      return {
        ...file,
        files: [...(file.files || []), newFileWithPublicId],
      };
    }

    if (file.files) {
      return {
        ...file,
        files: addFileToParent(file.files, newFileWithPublicId, parentId),
      };
    }

    return file;
  });
};
