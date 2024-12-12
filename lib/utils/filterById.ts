import { FileType } from '@/types/type';

export const filterById = (
  files: FileType[],
  fileId: string | string[]
): FileType[] => {
  const targetIds = Array.isArray(fileId) ? fileId : [fileId];
  return files
    .filter((file) => !targetIds.includes(file.id))
    .map((file) => ({
      ...file,
      files: file.files ? filterById(file.files, fileId) : file.files,
    }));
};
