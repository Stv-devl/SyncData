import React, { useCallback, useState } from 'react';
import IconsListWrapper from '../../../page/array/content/IconsListWrapper';
import UpdateInput from '@/components/form/UpdateNameInput';
import IconFileWrapper from '@/components/wrapper/IconFileWrapper';
import { arrayHeader } from '@/constantes/constantes';
import { headerClass } from '@/helpers/headerClass';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import { ArrayListContentProps, FileType } from '@/types/type';

const ListContent: React.FC<ArrayListContentProps> = ({
  files,
  updateFileName,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  handleMouseEnter,
  handleMouseLeave,
  toggleEditedFile,
}) => {
  const { getActionByType } = useManageFonctions();

  const [newFileName, setNewFileName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFileName(event.target.value);
  };

  const handleIconClick = useCallback(
    (icon: { type: string }, file: FileType) => {
      getActionByType(icon.type, file.id, file.filename);
    },
    [getActionByType]
  );

  const validateName = (fileId: string) => {
    updateFileName(fileId, newFileName);
    toggleEditedFile(fileId);
  };

  return (
    <>
      {files.map((file, index) => (
        <div
          key={file.id}
          className="ml-[9px] flex items-center px-3 transition-colors duration-500 lg:px-6"
        >
          <input
            type="checkbox"
            className="border-dark-gray mr-8 size-5 shrink-0 cursor-pointer border-2"
            onChange={() => toggleFileChecked(file.id)}
            checked={file.isChecked || false}
          />
          <ul
            className="hover:bg-light-blue flex h-16 w-full cursor-pointer items-center"
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
                  <div className="relative flex items-center gap-1">
                    {item.name === 'filename' ? (
                      <>
                        <IconFileWrapper type={file.type} className="size-8" />
                        {file.isEdited ? (
                          <>
                            <UpdateInput
                              file={file}
                              name="searchbar"
                              value={newFileName || ''}
                              handleChange={handleInputChange}
                              placeholder={file.filename}
                              autoComplete="off"
                              toggleEditedFile={toggleEditedFile}
                              validateName={validateName}
                              error={''}
                            />
                          </>
                        ) : (
                          <span>{String(content)}</span>
                        )}
                      </>
                    ) : (
                      <span>{String(content)}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <IconsListWrapper
            file={file}
            handleIconClick={handleIconClick}
            handleClickOpen={handleClickOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            index={index}
          />
        </div>
      ))}
    </>
  );
};

export default ListContent;
