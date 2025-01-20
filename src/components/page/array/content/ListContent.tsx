import clsx from 'clsx';
import React, { useMemo } from 'react';
import DropZoneWrapper from '../../../dropZone/DropZoneWrapper';
import IconsListWrapper from '../../../page/array/content/IconsListWrapper';
import UpdateInput from '@/components/form/UpdateNameInput';
import IconFileWrapper from '@/components/wrapper/IconFileWrapper';
import { arrayHeader } from '@/constantes/constantes';
import useFileEdition from '@/hook/ui/useFileEdition';
import { ArrayListContentProps } from '@/types/type';

const ListContent: React.FC<ArrayListContentProps> = ({
  files,
  updateFileName,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  handleMouseEnter,
  handleMouseLeave,
  toggleEditedFile,
  containerRef,
}) => {
  const {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
  } = useFileEdition({ files, toggleEditedFile, updateFileName });

  const fileNameStyle = useMemo(() => 'w-28 truncate sm:w-24 lg:w-52', []);

  const headerClass = (name: string) =>
    clsx(
      name === 'checked' && 'w-10 flex-none lg:w-16',
      name === 'filename' && 'grow',
      name !== 'checked' &&
        name !== 'filename' &&
        'w-[105px] flex-none lg:w-32',
      (name === 'modified' || name === 'acces') && 'hidden sm:block',
      'px-2'
    );

  return (
    <ul ref={containerRef}>
      {files.map((file, index) => (
        <li
          key={file.id}
          ref={
            file.isEdited
              ? (editedFileRef as React.MutableRefObject<HTMLLIElement | null>)
              : null
          }
          className=" mx-1 flex items-center px-3 transition-colors duration-500 sm:mr-0 lg:ml-[9px] lg:px-6"
        >
          <input
            type="checkbox"
            className="border-dark-gray z-9 mr-2 size-5 shrink-0 cursor-pointer border-2 lg:mr-8"
            onChange={() => toggleFileChecked(file.id)}
            checked={file.isChecked || false}
          />
          <ul
            className="hover:bg-light-blue relative flex h-16 w-full cursor-pointer items-center"
            onContextMenu={(e) =>
              handleClickOpen(
                e,
                file.filename,
                new DOMRect(e.clientX, e.clientY, 0, 0),
                file.id
              )
            }
            onClick={() => !file.isEdited && handleOpenFolder(file.id)}
          >
            {arrayHeader.map((item) => {
              const content = file[item.name as keyof typeof file];
              return (
                <li key={item.name} className={headerClass(item.name)}>
                  <div className="relative flex items-center gap-1 ">
                    {item.name === 'filename' ? (
                      <>
                        <IconFileWrapper type={file.type} className="size-8" />
                        {file.isEdited ? (
                          <UpdateInput
                            file={file}
                            isFile={false}
                            name="searchbar"
                            value={newFileName || ''}
                            handleChange={handleInputChange}
                            placeholder={file.filename}
                            autoComplete="off"
                            toggleEditedFile={toggleEditedFile}
                            validateName={validateName}
                            error={''}
                          />
                        ) : (
                          <span className={fileNameStyle}>
                            {String(content)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={fileNameStyle}>{String(content)}</span>
                    )}
                  </div>
                </li>
              );
            })}
            {file.type === 'folder' && (
              <DropZoneWrapper
                isDragIcon={false}
                dropStyle="absolute inset-0"
              />
            )}
          </ul>
          <IconsListWrapper
            file={file}
            handleIconClick={handleIconClick}
            handleClickOpen={handleClickOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListContent;
