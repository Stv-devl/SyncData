import { FileType } from '@/types/type';

export const updatePageStatus = (
  updatedDatas: FileType[],
  currentPage: number
) => {
  return currentPage === 1
    ? 1
    : updatedDatas.length > 0
    ? currentPage
    : currentPage - 1;
};
