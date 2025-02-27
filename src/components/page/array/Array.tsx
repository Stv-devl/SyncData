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

/**
 * Array component that displays files in either list or grid view
 * @component
 * @returns {JSX.Element} The rendered Array component with files display and controls
 */
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

  /**
   * Gets the current folder name
   */
  const currentFolderName = useCurrentFolderName(
    filterTools,
    parentFolderId,
    files ?? []
  );

  /**
   * Sets the current page and entries per page based on the file count
   * if its favorite page, set the display of the favorite files
   * else set the display of the files
   */
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

  /**
   * Displays the favorite files or the files on the page
   * @returns {Array} The displayed files
   */
  const displayFileToArray = isFavoritePage
    ? displayFavoritesFiles
    : displayFiles;

  /**
   * Toggles the icon between list and grid view
   */
  const toggleIcon = useCallback(() => {
    setIsList(!isList);
  }, [isList, setIsList]);

  /**
   * Generates a class string for the icon toggle
   */
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

  /**
   * Handles the context menu event
   * @param {React.MouseEvent} e - The mouse event
   * @param {string} filename - The name of the file
   * @param {DOMRect} rect - The rectangle of the file
   * @param {string} fileId - The id of the file
   *
   */
  const handleContextMenu = useCallback(
    (e: React.MouseEvent, filename: string, rect: DOMRect, fileId: string) => {
      e.preventDefault();
      handleClickOpen(e, filename, rect, fileId);
    },
    [handleClickOpen]
  );

  /**
   * Handles the checkbox change event
   * @param {string} fileId - The id of the file
   */
  const handleCheckboxChange = useCallback(
    (fileId: string) => {
      toggleFileChecked(fileId);
    },
    [toggleFileChecked]
  );

  /**
   * Handles the mouse enter event
   * @param {React.MouseEvent} event - The mouse event
   * @param {string} type - The type of the element
   * @param {string} transform - The transform of the element
   */
  const handleMouseEnterCallback = useCallback(
    (event: React.MouseEvent, type: string, transform: string) => {
      handleMouseEnter(event, type, transform);
    },
    [handleMouseEnter]
  );

  /**
   * Handles the mouse leave event
   * @param {React.MouseEvent} event - The mouse event
   */
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
          {(!isFavoritePage || filterTools.searchbar.length === 0) && (
            <>
              <DropZoneWrapper
                isDragIcon={true}
                dropFolderId={parentFolderId}
                dropStyle="absolute inset-0"
              />
            </>
          )}
          {!isFavoritePage ||
            (filterTools.searchbar.length === 0 && <EmptyContent />)}
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
