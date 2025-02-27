'use client';

import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '../../../constantes/iconsMap';
import FileContent from './content/FileContent';
import ListContent from './content/ListContent';
import Header from './Header';
import DropZoneWrapper from '@/components/dropZone/DropZoneWrapper';
import EmptyContent from '@/components/dropZone/EmptyContent';
import Pagination from '@/components/pagination/Pagination';
import useCurrentFolderName from '@/hook/manage/useManageCurrentFolderName';
import useResponsiveFileCount from '@/hook/ui/useResponsiveFileCount';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';

const Array = () => {
  const {
    files,
    displayFiles,
    displayFavoritesFiles,
    setDisplayFiles,
    setDisplayFavoritesFile,
    isList,
    isFavoritePage,
    filterTools,
    setIsList,
    setEntriesPerPage,
    updateFileName,
    setFilesChecked,
    toggleFileChecked,
    setCurrentPage,
    parentFolderId,
    handleOpenFolder,
    handleBackFolder,
    toggleEditedFile,
  } = useFileStore();

  const { handleClickOpen, handleMouseEnter, handleMouseLeave } =
    usePopupStore();
  const { containerRef, fileCount } = useResponsiveFileCount(isList);

  const currentFolderName = useCurrentFolderName(
    filterTools,
    parentFolderId,
    files ?? []
  );


  useEffect(() => {
    if (fileCount === 0 || !files) return;
    setCurrentPage(1);
    setEntriesPerPage(fileCount);
    if (isFavoritePage) {
      setDisplayFavoritesFile(files);
    } else {
      setDisplayFiles(files);
    }
  }, [fileCount, isFavoritePage, setEntriesPerPage, setDisplayFiles]);


  const displayFileToArray = isFavoritePage
    ? displayFavoritesFiles
    : displayFiles;

  const toggleIcon = useCallback(() => {
    setIsList(!isList);
  }, [isList, setIsList]);

  const toggleIconClasses = useMemo(
    () =>
      twMerge(
        clsx(
          isList ? 'right-3 top-2' : 'right-2 top-1',
          'absolute hidden cursor-pointer sm:block'
        )
      ),
    [isList]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, filename: string, rect: DOMRect, fileId: string) => {
      e.preventDefault();
      handleClickOpen(e, filename, rect, fileId);
    },
    [handleClickOpen]
  );

  const handleCheckboxChange = useCallback(
    (fileId: string) => {
      toggleFileChecked(fileId);
    },
    [toggleFileChecked]
  );

  const handleMouseEnterCallback = useCallback(
    (event: React.MouseEvent, type: string, transform: string) => {
      handleMouseEnter(event, type, transform);
    },
    [handleMouseEnter]
  );

  const handleMouseLeaveCallback = useCallback(() => {
    handleMouseLeave();
  }, [handleMouseLeave]);

  const mouseLabel = isList ? 'Folder' : 'List';
  const mouseTransform = isList
    ? 'translate(-20%, -110%)'
    : 'translate(0%, -100%)';

  return (
    <section className="relative mx-auto size-full rounded-lg bg-white p-4 lg:p-8">
      <Header isList={isList} setFilesChecked={setFilesChecked} />
      <div className="bg-lightest-gray flex h-[97%] w-full flex-col overflow-y-auto rounded-lg transition-all duration-300">
        <>
          {currentFolderName !== 'root' && !isFavoritePage && (
            <div className="flex flex-row content-center p-2">
              <iconsMap.IconChevronLeft
                className="cursor-pointer"
                onClick={handleBackFolder}
              />
              <p className="w-[150px] truncate capitalize">
                {currentFolderName}
              </p>
            </div>
          )}
          {displayFileToArray && displayFileToArray.length > 0 ? (
            isList ? (
              <ListContent
                files={displayFileToArray}
                updateFileName={updateFileName}
                handleOpenFolder={handleOpenFolder}
                toggleFileChecked={handleCheckboxChange}
                handleClickOpen={handleContextMenu}
                handleMouseEnter={handleMouseEnterCallback}
                handleMouseLeave={handleMouseLeaveCallback}
                toggleEditedFile={toggleEditedFile}
                containerRef={containerRef}
              />
            ) : (
              <FileContent
                files={displayFileToArray}
                updateFileName={updateFileName}
                handleOpenFolder={handleOpenFolder}
                toggleFileChecked={handleCheckboxChange}
                handleClickOpen={handleContextMenu}
                toggleEditedFile={toggleEditedFile}
                containerRef={containerRef}
              />
            )
          ) : null}
        </>
        <div className="relative hidden sm:block lg:flex-1">
          {!isFavoritePage ||
            (filterTools.searchbar && (
              <>
                <DropZoneWrapper
                  isDragIcon={true}
                  dropFolderId={parentFolderId}
                  dropStyle="absolute inset-0"
                />
              </>
            ))}
          {!isFavoritePage || (filterTools.searchbar && <EmptyContent />)}
        </div>
        <Pagination />
      </div>
      <div
        onClick={toggleIcon}
        className={toggleIconClasses}
        onMouseEnter={(e) => handleMouseEnter(e, mouseLabel, mouseTransform)}
        onMouseLeave={handleMouseLeave}
      >
        {isList ? <iconsMap.IconSortFiles /> : <iconsMap.IconSortList />}
      </div>
    </section>
  );
};

export default Array;
