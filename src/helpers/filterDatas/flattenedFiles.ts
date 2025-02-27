import { FileType } from '@/types/type';

export const flattenedFiles = (files: FileType[] | null): FileType[] => {
  if (!files) return [];

  return files.reduce<FileType[]>((acc, file) => {
    acc.push(file);
    if (file.files?.length) {
      acc.push(...flattenedFiles(file.files));
    }
    return acc;
  }, []);
};
