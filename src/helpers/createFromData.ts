import { FileType } from '@/types/type';

export const createFormData = (
  userId: string,
  parentId: string,
  newFile: FileType
): FormData => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('parentId', parentId);
  if (newFile.file && newFile.file instanceof File) {
    formData.append('file', newFile.file);
  }
  const { file, ...newFileWithoutFile } = newFile;
  formData.append('newFile', JSON.stringify(newFileWithoutFile));

  return formData;
};
