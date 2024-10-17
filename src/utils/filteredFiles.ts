import { FileType } from '@/types/type';

export const filteredFiles = (files: FileType[]) => {
  return files && files.filter((element) => element.type === 'folder');
};
