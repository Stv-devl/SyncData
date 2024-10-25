'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '../../../constantes/iconsMap';
import EmptyContent from './content/EmptyContent';
import FileContent from './content/FileContent';
import ListContent from './content/ListContent';
import Header from './Header';
import usePopupEffect from '@/hook/ui/usePopupEffect';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';

const Array = () => {
  //mettre isList dans store + persistant, pareil pour FileContent
  const [isList, setIsList] = useState(true);

  const {
    files,
    setAllFilesChecked,
    toggleFileChecked,
    currentFolder,
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

  const toggleIcon = () => setIsList((prev) => !prev);

  usePopupEffect(isOpen, handleClickClose);

  const mouseLabel = isList ? 'Folder' : 'List';
  const mouseTransform = isList
    ? 'translate(-20%, -110%)'
    : 'translate(0%, -100%)';

  return (
    <section className="relative mx-auto size-full rounded-lg bg-white p-4 lg:p-8">
      <Header isList={isList} setAllFilesChecked={setAllFilesChecked} />
      <div className="bg-lightest-gray h-[97%] w-full rounded-lg ">
        {currentFolder === 'root' ? null : (
          <div className="flex flex-row gap-2">
            <span className="cursor-pointer" onClick={() => handleBackFolder()}>
              &lt;
            </span>
            <p>{currentFolder}</p>
          </div>
        )}
        {files && files.length > 0 ? (
          <>
            {isList ? (
              <ListContent
                files={files}
                handleOpenFolder={handleOpenFolder}
                toggleFileChecked={toggleFileChecked}
                handleClickOpen={handleClickOpen}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ) : (
              <FileContent
                files={files}
                handleOpenFolder={handleOpenFolder}
                toggleFileChecked={toggleFileChecked}
                handleClickOpen={handleClickOpen}
              />
            )}
          </>
        ) : (
          <EmptyContent />
        )}
      </div>

      <div
        onClick={() => {
          toggleIcon();
        }}
        className={twMerge(
          clsx(
            isList ? 'right-3 top-2' : 'right-2 top-1',
            'absolute hidden cursor-pointer  sm:block'
          )
        )}
        onMouseEnter={(e) => handleMouseEnter(e, mouseLabel, mouseTransform)}
        onMouseLeave={handleMouseLeave}
      >
        {isList ? <iconsMap.IconSortFiles /> : <iconsMap.IconSortList />}
      </div>
    </section>
  );
};
export default Array;
