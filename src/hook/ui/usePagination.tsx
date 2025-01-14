import React, { useMemo } from 'react';
import { getArray } from '../../helpers/getArray';
import { UsePaginationProps } from '@/types/type';

const MIDDLE_BUTTONS = 3;
const DOTS = '...';

/**
 * Custom hook for managing pagination logic.
 * @param {number} pageNumber - The total number of pages.
 * @param {number} currentPage - The current active page number.
 * @returns {Object} - The pagination array.
 */

const usePagination = ({ pageNumber, currentPage }: UsePaginationProps) => {
  const pagination = useMemo(() => {
    let pageArray;
    const screenWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1024;
    const maxButton = screenWidth > 640 ? 5 : 3;
    const initialArray = [1, pageNumber];

    if (pageNumber <= maxButton) {
      pageArray = Array.from({ length: pageNumber - 2 }, (_, i) => i + 2);
    } else if (maxButton === 3) {
      if (currentPage <= 2) {
        pageArray = [2, DOTS];
      } else if (currentPage >= pageNumber - 1) {
        pageArray = [DOTS, pageNumber - 1];
      } else {
        pageArray = [DOTS, currentPage, DOTS];
      }
    } else {
      if (currentPage <= 3) {
        pageArray = [...getArray(maxButton - 2, 2), DOTS];
      } else if (currentPage > 3 && currentPage <= pageNumber - 3) {
        pageArray = [DOTS, ...getArray(MIDDLE_BUTTONS, currentPage - 1), DOTS];
      } else if (currentPage > pageNumber - 3) {
        pageArray = [
          DOTS,
          ...getArray(maxButton - 2, pageNumber - maxButton + 2),
        ];
      }
    }
    pageArray = pageArray || [];

    initialArray.splice(1, 0, ...pageArray);

    return initialArray;
  }, [currentPage, pageNumber]);

  return { pagination };
};

export default usePagination;
