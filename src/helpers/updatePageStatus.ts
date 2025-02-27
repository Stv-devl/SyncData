import { FileType } from '@/types/type';

/**
 * Updates the page status based on the current page and the updated datas
 * @param {FileType[]} updatedDatas - The updated datas
 * @param {number} currentPage - The current page of the application
 * @returns {number} The updated page status
 */
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
