import React, { useMemo } from 'react';
import { UsePaginationProps } from '@/types/type';

const DOTS = '...';

/**
 * Custom hook for managing pagination logic.
 * @param {number} pageNumber - Total number of pages.
 * @param {number} currentPage - Current active page.
 * @returns {Object} - The pagination array.
 */
const usePagination = ({ pageNumber, currentPage }: UsePaginationProps) => {
  const pagination = useMemo(() => {
    const screenWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1024;
    const maxButton = screenWidth > 640 ? 5 : 3;

    if (pageNumber <= maxButton) {
      return Array.from({ length: pageNumber }, (_, i) => i + 1);
    }

    let pageArray: (string | number)[] = [];

    if (maxButton === 3) {
      if (currentPage <= 2) {
        pageArray = [1, 2, DOTS];
      } else if (currentPage >= pageNumber - 1) {
        pageArray = [DOTS, pageNumber - 1, pageNumber];
      } else {
        pageArray = [currentPage, currentPage + 1, DOTS];
      }
    } else {
      if (currentPage <= 3) {
        pageArray = [1, 2, 3, DOTS, pageNumber];
      } else if (currentPage > 3 && currentPage <= pageNumber - 3) {
        pageArray = [DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS];
      } else {
        pageArray = [DOTS, pageNumber - 2, pageNumber - 1, pageNumber];
      }
    }

    return pageArray;
  }, [currentPage, pageNumber]);

  return { pagination };
};

export default usePagination;
