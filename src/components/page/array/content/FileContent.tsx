import React from 'react';
import IconFileWrapper from '../../../wrapper/IconFileWrapper';
import DropZoneWrapper from '@/components/dropZone/DropZoneWrapper';
import UpdateInput from '@/components/form/UpdateNameInput';
import { arrayIcone } from '@/constantes/constantes';
import useFileEdition from '@/hook/ui/useFileEdition';
import IconFavorited from '@/icones/iconFavorited';
import { ArrayFileContentProps } from '@/types/type';

const FileContent: React.FC<ArrayFileContentProps> = ({
  files,
  updateFileName,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  toggleEditedFile,
}) => {
  const {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
  } = useFileEdition({ files, toggleEditedFile, updateFileName });

  return (
    <ul className="grid-cols-auto-fill-minmax grid gap-4 p-6">
      {files.map((file) => (
        <li key={file.id} className="relative size-28">
          <div
            ref={file.isEdited ? editedFileRef : null}
            className="hover:bg-light-blue z-2 flex size-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white transition-colors duration-500"
            onContextMenu={(e) =>
              handleClickOpen(
                e,
                file.filename,
                new DOMRect(e.clientX, e.clientY, 0, 0),
                file.id
              )
            }
            onClick={() => handleOpenFolder(file.id)}
          >
            <IconFileWrapper type={file.type} />
            {file.isEdited ? (
              <UpdateInput
                file={file}
                isFile={true}
                name="searchbar"
                value={newFileName || ''}
                handleChange={handleInputChange}
                placeholder={file.filename}
                autoComplete="off"
                toggleEditedFile={toggleEditedFile}
                validateName={validateName}
                error=""
              />
            ) : (
              <span className="w-[90%] truncate text-center">
                {file.filename}
              </span>
            )}

            {file.isFavorite && (
              <IconFavorited
                className="text-regular-blue hover:text-dark-blue z-2 absolute left-2 top-2 w-[23px] transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(arrayIcone[0], file);
                }}
              />
            )}
            <div className="z-2 absolute right-2 top-2">
              <input
                type="checkbox"
                className="border-dark-gray size-4 border-2"
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleFileChecked(file.id)}
                checked={file.isChecked || false}
              />
            </div>
            {file.type === 'folder' && (
              <DropZoneWrapper
                isDragIcon={false}
                dropFolderId={file.id}
                dropStyle="absolute inset-0"
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileContent;
