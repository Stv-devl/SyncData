'use client';

import clsx from 'clsx';
import { findFileRecursive } from 'lib/utils/findFileRecursive';
import React, { useCallback, useEffect, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '../../../constantes/iconsMap';
import FileContent from './content/FileContent';
import ListContent from './content/ListContent';
import Header from './Header';
import DropZoneWrapper from '@/components/dropZone/DropZoneWrapper';
import EmptyContent from '@/components/dropZone/EmptyContent';
import Pagination from '@/components/pagination/Pagination';
import usePopupEffect from '@/hook/ui/usePopupEffect';
import useResponsiveFileCount from '@/hook/ui/useResponsiveFileCount';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';

const Array = () => {
  const {
    files,
    isList,
    setIsList,
    setEntriesPerPage,
    updateFileName,
    displayFiles,
    setDisplayFiles,
    setAllFilesChecked,
    toggleFileChecked,
    parentFolderId,
    handleOpenFolder,
    handleBackFolder,
    toggleEditedFile,
  } = useFileStore();
  const {
    isOpen,
    handleClickOpen,
    handleClickClose,
    handleMouseEnter,
    handleMouseLeave,
  } = usePopupStore();
  const { containerRef, fileCount } = useResponsiveFileCount(isList);
  useEffect(() => {
    if (fileCount === 0) return;
    setEntriesPerPage(fileCount);
    setDisplayFiles(displayFiles);
  }, [fileCount, setEntriesPerPage, setDisplayFiles]);

  const toggleIcon = useCallback(() => {
    setIsList(!isList);
  }, [isList, setIsList]);
  usePopupEffect(isOpen, handleClickClose);

  const currentFolderName = useMemo(() => {
    return parentFolderId === 'root'
      ? 'root'
      : findFileRecursive(files ?? [], parentFolderId)?.filename;
  }, [parentFolderId, files]);

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
      <Header isList={isList} setAllFilesChecked={setAllFilesChecked} />
      <div className="bg-lightest-gray flex h-[97%] w-full flex-col overflow-y-auto rounded-lg transition-all duration-300">
        <>
          {currentFolderName !== 'root' && (
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
          {displayFiles && displayFiles.length > 0 ? (
            isList ? (
              <ListContent
                files={displayFiles}
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
                files={displayFiles}
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
          <DropZoneWrapper isDragIcon={true} dropStyle="absolute inset-0" />
          <EmptyContent />
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
