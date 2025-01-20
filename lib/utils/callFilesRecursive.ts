import { FileType } from '@/types/type';

export const callFilesRecursive = (
  files: FileType[],
  callback: (file: FileType, parent?: FileType) => FileType,
  parent?: FileType
): FileType[] => {
  return files.map((file) => {
    const newFile = callback(file, parent);

    if (file.files?.length) {
      newFile.files = callFilesRecursive(
        newFile.files || file.files,
        callback,
        newFile
      );
    }

    return newFile;
  });
};
