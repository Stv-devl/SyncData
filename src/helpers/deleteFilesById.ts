import { FileType } from '@/types/type';

export const deleteFilesById = (
  files: FileType[],
  fileId: string | string[]
) => {
  return files.filter((file) =>
    Array.isArray(fileId) ? !fileId.includes(file.id) : file.id !== fileId
  );
};
