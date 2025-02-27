import clsx from 'clsx';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React, { useCallback, useMemo } from 'react';
import usePagination from '../../hook/ui/usePagination';
import { findFavoriteFiles } from '@/helpers/findFavoriteFiles';
import { useFileStore } from '@/store/useFileStore';

const Pagination = () => {
  const {
    files,
    parentFolderId,
    filterTools,
    currentPage,
    entriesPerPage,
    isFavoritePage,
    setCurrentPage,
    setDisplayFiles,
    setDisplayFavoritesFile,
  } = useFileStore();

  const fileToPaginate = useMemo(() => {
    if (isFavoritePage) return findFavoriteFiles(files || []);
    if (parentFolderId === 'root' || !files) return files;
    const findFolder = findFileRecursive(files, parentFolderId);
    return findFolder && !Array.isArray(findFolder)
      ? findFolder.files || []
      : null;
  }, [files, parentFolderId, isFavoritePage]);

  const pageNumber = useMemo(() => {
    if (filterTools.searchbar.length > 0) return null;
    return fileToPaginate
      ? Math.ceil(fileToPaginate.length / entriesPerPage)
      : 1;
  }, [fileToPaginate, entriesPerPage, filterTools]);

  const { pagination } = usePagination({
    pageNumber: pageNumber || 1,
    currentPage,
  });

  const handleChangePage = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      if (fileToPaginate && !isFavoritePage) {
        setDisplayFiles(fileToPaginate);
      } else {
        setDisplayFavoritesFile(fileToPaginate || []);
      }
    },
    [
      setCurrentPage,
      setDisplayFiles,
      fileToPaginate,
      isFavoritePage,
      setDisplayFavoritesFile,
    ]
  );

  const getButtonClasses = (isActive: boolean) =>
    clsx(
      'rounded-lg px-3 py-[5px] transition duration-300',
      isActive
        ? 'bg-dark-blue text-white'
        : 'bg-regular-blue hover:bg-dark-blue text-white'
    );

  return (
    <div className="z-8 my-7 flex justify-center gap-2">
      {pageNumber && pageNumber > 3 ? (
        <button
          className={getButtonClasses(false)}
          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>
      ) : null}
      <>
        {pagination && pageNumber && pageNumber > 1
          ? pagination.map((page, index) => (
              <button
                key={index}
                className={getButtonClasses(page === currentPage)}
                disabled={typeof page === 'string' || page === currentPage}
                onClick={(e) =>
                  handleChangePage(
                    parseInt((e.target as HTMLElement).textContent || '')
                  )
                }
              >
                {page}
              </button>
            ))
          : null}
      </>
      {pageNumber && pageNumber > 3 ? (
        <button
          className={getButtonClasses(false)}
          onClick={() =>
            handleChangePage(Math.min(pageNumber, currentPage + 1))
          }
        >
          Next
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
