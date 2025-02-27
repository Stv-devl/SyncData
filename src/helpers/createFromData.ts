import { FileType } from '@/types/type';

/**
 * Creates a FormData object from a userId, parentId, and newFile
 * @param {string} userId - The userId of the user
 * @param {string} parentId - The parentId of the file
 * @param {FileType} newFile - The new file to be created
 * @returns {FormData} The FormData object
 */
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
