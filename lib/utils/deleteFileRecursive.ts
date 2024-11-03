import { FileType } from '@/types/type';

export const deleteFileRecursive = (
  files: FileType[],
  fileId: string | string[],
  parentId: string
): FileType[] => {
  return files.map((file) => {
    if (file.id === parentId) {
      return {
        ...file,
        files: file.files
          ? file.files.filter((child) => {
              if (Array.isArray(fileId)) {
                return !fileId.includes(child.id);
              } else {
                return child.id !== fileId;
              }
            })
          : [],
      };
    }
    return file.files
      ? {
          ...file,
          files: deleteFileRecursive(file.files, fileId, parentId),
        }
      : file;
  });
};
