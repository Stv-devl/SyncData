import { FileType } from '@/types/type';

export const filteredFolders = (files: FileType[]) => {
  return files && files.filter((element) => element.type === 'folder');
};
