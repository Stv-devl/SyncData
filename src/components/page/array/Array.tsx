'use client';

import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { findFolderById } from '../../../../lib/utils/findFolderById';
import { iconsMap } from '../../../constantes/iconsMap';
import EmptyContent from './content/EmptyContent';
import FileContent from './content/FileContent';
import ListContent from './content/ListContent';
import Header from './Header';
import usePopupEffect from '@/hook/ui/usePopupEffect';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';

const Array = () => {
  //mettre isList dans store + persistant, pareil dans FileContent
  const [isList, setIsList] = useState(true);

  const {
    files,
    displayFiles,
    setAllFilesChecked,
    toggleFileChecked,
    parentFolderId,
    handleOpenFolder,
    handleBackFolder,
  } = useFileStore();
  const {
    isOpen,
    handleClickOpen,
    handleClickClose,
    handleMouseEnter,
    handleMouseLeave,
  } = usePopupStore();

  const toggleIcon = useCallback(() => setIsList((prev) => !prev), []);

  usePopupEffect(isOpen, handleClickClose);

  const currentFolderName = useMemo(() => {
    return parentFolderId === 'root'
      ? 'root'
      : findFolderById(files ?? [], parentFolderId)?.filename;
  }, [parentFolderId, files]);

  console.log(files);

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
      <div className="bg-lightest-gray h-[97%] w-full rounded-lg">
        {currentFolderName !== 'root' && (
          <div className="flex flex-row gap-2">
            <span className="cursor-pointer" onClick={handleBackFolder}>
              &lt;
            </span>
            <p>{currentFolderName}</p>
          </div>
        )}
        {displayFiles && displayFiles.length > 0 ? (
          isList ? (
            <ListContent
              files={displayFiles}
              handleOpenFolder={handleOpenFolder}
              toggleFileChecked={handleCheckboxChange}
              handleClickOpen={handleContextMenu}
              handleMouseEnter={handleMouseEnterCallback}
              handleMouseLeave={handleMouseLeaveCallback}
            />
          ) : (
            <FileContent
              files={displayFiles}
              handleOpenFolder={handleOpenFolder}
              toggleFileChecked={handleCheckboxChange}
              handleClickOpen={handleContextMenu}
            />
          )
        ) : (
          <EmptyContent />
        )}
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
