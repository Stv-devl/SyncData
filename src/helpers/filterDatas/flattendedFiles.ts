import { FileType } from '@/types/type';

export const flattenedFiles = (files: FileType[] | null) => {
  const flattenNestedFiles = (files: FileType[]): FileType[] => {
    const allFiles: FileType[] = [];
    if (!files) return allFiles;
    for (const file of files) {
      allFiles.push(file);
      if (file.files) {
        allFiles.push(...flattenNestedFiles(file.files));
      }
    }
    return allFiles;
  };
  return flattenNestedFiles(files || []);
};
